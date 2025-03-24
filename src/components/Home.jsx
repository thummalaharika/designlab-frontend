import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx'; // Import XLSX for Excel generation
import Navb from './Navb';
import Cookies from 'js-cookie';

function Home() {
  const [ipAddress, setIpAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanResults, setScanResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleScan = async () => {
    if (!ipAddress) {
      setError('IP address is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/ipscan/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${Cookies.get('token')}`
        },
        body: JSON.stringify({ ip_address: ipAddress })
      });

      const data = await response.json();

      if (data.status) {
        setScanResults(data.scan_results);
        setError(null);
      } else {
        setScanResults([]);
        setError('No scan results found or invalid IP address');
      }
    } catch (error) {
      setError('Error occurred while scanning');
      setScanResults([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = () => {
    if (scanResults.length === 0) {
      alert('No data to download!');
      return;
    }

    const headers = ["Port", "Service", "Product", "Version", "CVE-ID", "Description", "CVSS Score"];
    const data = scanResults.map(result => ({
      Port: result.port,
      Service: result.service,
      Product: result.product || 'N/A',
      Version: result.version || 'N/A',
      "CVE-ID": result.vuln_id || 'N/A',
      Description: result.Description || 'N/A',
      "CVSS Score": result.CVSS_Score || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Scan Results");

    XLSX.writeFile(workbook, "scan_results.xlsx");
  };

  return (
    <>
      <Navb />

      {/* Top-right corner button */}
      <div style={{ position: "absolute", top: "10px", right: "20px" }}>
        <Button variant="primary" onClick={downloadExcel} disabled={scanResults.length === 0}>
          Download Excel
        </Button>
      </div>

      <div className='ip-form'>
        <h1>IP Scanner</h1>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter IP Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg: 10.3.100.100"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </div>

      {loading && 
        <div className='loading'>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as="p" animation="wave">
            <Placeholder xs={12} />
          </Placeholder>
        </div>
      }

      <div className="card ip-form">
        {!loading && <Button type="button" variant='success' onClick={handleScan}>Scan</Button>}
        {loading && 
          <Button variant="primary" disabled>
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            Scanning...
          </Button>
        }
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {scanResults.length > 0 && (
        <div className="scan-results mt-4">
          <h3>Scan Results</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Port</th>
                <th>Service</th>
                <th>Product</th>
                <th>Version</th>
                <th>CVE-ID</th>
                <th>Description</th>
                <th>CVSS Score</th>
              </tr>
            </thead>
            <tbody>
              {scanResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.port}</td>
                  <td>{result.service}</td>
                  <td>{result.product || 'N/A'}</td>
                  <td>{result.version || 'N/A'}</td>
                  <td>{result.vuln_id || 'N/A'}</td>
                  <td>{result.Description || 'N/A'}</td>
                  <td>{result.CVSS_Score || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Home;
