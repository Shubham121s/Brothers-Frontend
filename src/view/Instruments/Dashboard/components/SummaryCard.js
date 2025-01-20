import React from "react";
import styled from "styled-components";
import { MdOutlineFileUpload } from "react-icons/md";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { GrVirtualMachine } from "react-icons/gr";

const Container = styled.div`
  background-color: white;
  margin: 10px;
  padding: 10px;
  border-radius: 1rem;
`;

const Card = styled.div`
  background-color: ${(props) => props.bgColor};
  padding: 1.5rem;
  width: 100%;
  max-width: 200px;
  height: 198px;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  background-color: ${(props) => props.iconBgColor};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Value = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.75rem;
`;

const Label = styled.p`
  font-size: 0.8rem;
  font-weight: medium;
`;

const SummaryCards = () => {
  const data = {
    machines: 50,
    upcomingMaintenance: 10,
    overdueMaintenance: 5,
    upToDate: 35,
    upcomingCalibrations: 7,
    overdueCalibrations: 3,
  };

  return (
    <Container>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
        <Card bgColor="#FFE2E5">
          <IconContainer iconBgColor="#FA5A7D">
            <GrVirtualMachine
              style={{
                color: "white",
                fontSize: "24px",
              }}
            />
          </IconContainer>
          <Value>{data.machines}</Value>
          <Label>Machines</Label>
        </Card>

        <Card bgColor="#FFF4DE">
          <IconContainer iconBgColor="#FF947A">
            <CalendarOutlined style={{ color: "white", fontSize: "24px" }} />
          </IconContainer>
          <Value>{data.upcomingMaintenance}</Value>
          <Label>Upcoming Maintenance</Label>
        </Card>

        <Card bgColor="#DCFCE7">
          <IconContainer iconBgColor="#3CD856">
            <ExclamationCircleOutlined
              style={{ color: "white", fontSize: "24px" }}
            />
          </IconContainer>
          <Value>{data.overdueMaintenance}</Value>
          <Label>Overdue Maintenance</Label>
        </Card>

        <Card bgColor="#F3E8FF">
          <IconContainer iconBgColor="#BF83FF">
            <CheckCircleOutlined style={{ color: "white", fontSize: "24px" }} />
          </IconContainer>
          <Value>{data.upToDate}</Value>
          <Label>Up-to-Date Machines</Label>
        </Card>

        <Card bgColor="#e4eff6">
          <IconContainer iconBgColor="#096CAE">
            <CalendarOutlined style={{ color: "white", fontSize: "24px" }} />
          </IconContainer>
          <Value>{data.upcomingCalibrations}</Value>
          <Label>Upcoming Calibrations</Label>
        </Card>

        <Card bgColor="#FFF4DE">
          <IconContainer iconBgColor="#FF947A">
            <ExclamationCircleOutlined
              style={{ color: "white", fontSize: "24px" }}
            />
          </IconContainer>
          <Value>{data.overdueCalibrations}</Value>
          <Label>Overdue Calibrations</Label>
        </Card>
      </div>
    </Container>
  );
};

export default SummaryCards;
