import React, { useState, useEffect } from "react";
import { LineChart } from "../../components";
import { DatePicker, Checkbox, Row, Col } from "antd";
import { getDevices, getReadings } from "../../services/dataService";

const REFRESH_TIMER = 5000;

function History() {
  const [allDevices, setAllDevices] = useState([]);
  const [allReadings, setAllReadings] = useState([]);
  const [devices, setDevice] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const dev = urlParams.get("device_id");
  if (devices == null && dev != null) setDevice([dev]);

  useEffect(() => {
    let readings = [];

    const init = async () => {
      readings = [];

      const data = await getDevices();
      setAllDevices(data);
      for (let device of data) {
        const reading = await getReadings(device.device_id);

        for (let r of reading) {
          readings.push(r);
        }
      }
      if (readings.length > 0) {
        setAllReadings(readings);
      }
    };

    init();
    const initInterval = setInterval(init, REFRESH_TIMER);

    return () => clearInterval(initInterval);
  }, []);

  let graph = <></>;

  if (devices && devices.length > 0) {
    //device selected
    let readings = filterReadings(allReadings, devices, start, end);
    graph = <LineChart readings={readings} devices={devices} />;
  }
  return (
    <div className="history-content">
      <div className="history-search">
        <DatePicker
          id="timestamp-start"
          showTime={{ format: "HH:mm" }}
          format="DD.MM.YYYY. HH:mm"
          placeholder="Start Timestamp"
          onChange={(event) => {
            console.log(event);
            setStart(event ? new Date(event) : null);
          }}
        />
        <br></br>
        <DatePicker
          id="timestamp-end"
          showTime={{ format: "HH:mm" }}
          format="DD.MM.YYYY. HH:mm"
          placeholder="End Timestamp"
          onChange={(event) => {
            setEnd(event ? new Date(event) : null);
          }}
        />
        <br></br>
        <h4>Devices: </h4>
        <Checkbox.Group
          onChange={(event) => {
            setDevice(event);
          }}
          defaultValue={[dev]}
        >
          {allDevices.map((item) => (
            <Row key={item.device_id}>
              <Col span={8}>
                <Checkbox value={item.device_id}>{item.device_id}</Checkbox>
              </Col>
            </Row>
          ))}
        </Checkbox.Group>
      </div>
      <div className="history-graph"> {graph} </div>
    </div>
  );
}

function filterReadings(allReadings, devices, start, end) {
  let readings = [];
  for (let device of devices) {
    let deviceReadings = allReadings.filter(
      (item) => item.device_id === device
    );
    if (start)
      deviceReadings = deviceReadings.filter(
        (item) => new Date(Date.parse(item.created_at)).getTime() >= start
      );
    if (end)
      deviceReadings = deviceReadings.filter(
        (item) => new Date(Date.parse(item.created_at)).getTime() <= end
      );
    readings = readings.concat(deviceReadings);
  }
  return readings;
}

export default History;
