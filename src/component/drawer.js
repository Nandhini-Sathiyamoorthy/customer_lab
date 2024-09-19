import React, { useEffect, useState } from "react";
import { Button, Drawer, Space, Badge, Select, notification } from "antd";

const { Option } = Select;

const DrawerComponent = () => {
  var [open, updateOpen] = useState(false);
  var [visibilityOfAddSchematoSegment, updateVisibilityOfAddSchematoSegment] =
    useState(false);
  var [availableSchema, updateAvailableSchema] = useState([
    { label: "Enter Your First Name", value: "firstName" },
    { label: "Enter Your Last Name", value: "lastName" },
    { label: "Enter Your Gender", value: "gender" },
    { label: "Enter Your Age", value: "age" },
    { label: "Enter Your Account Name", value: "accountName" },
    { label: "Enter Your City", value: "city" },
    { label: "Enter Your State", value: "state" },
  ]);
  var [selectedSchema, updateSelectedSchema] = useState([]);
  var [newSchema, updateNewSchema] = useState("");
  var [manualSchema, updateManualSchema] = useState({
    firstName: true,
    accountName: true,
  });
  var [inputValue, updateInputValue] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    accountName: "",
    city: "",
    state: "",
  });
  var [showValue, updateShowValue] = useState([]);

  useEffect(() => {}, []);
  const showDrawer = () => {
    updateOpen(true);
  };

  const onClose = () => {
    updateOpen(false);
  };

  const handleToAddSegmentButton = () => {
    if (newSchema) {
      var newSchemaAdd = availableSchema.find(
        (schema) => schema.value === newSchema
      );
      updateSelectedSchema([...selectedSchema, newSchemaAdd]);

      var remainingSchema = availableSchema.filter(
        (schema) => schema.value !== newSchema
      );
      updateAvailableSchema(remainingSchema);
      updateNewSchema("");
      updateVisibilityOfAddSchematoSegment(false);
    }
  };

  const handleToSelectOption = (value) => {
    updateNewSchema(value);
  };

  const handleToAddSegment = () => {
    updateVisibilityOfAddSchematoSegment(true);
  };

  const handleToRemove = (incomingValue) => {
    var removeItemIndex = selectedSchema.findIndex(
      (value) => value.value === incomingValue
    );
    var remove = selectedSchema.splice(removeItemIndex, 1);
    updateSelectedSchema([...selectedSchema]);
    updateAvailableSchema([...availableSchema, ...remove]);
  };

  const handleToRemoveManual = (schemaValue) => {
    updateManualSchema({ ...manualSchema, [schemaValue]: false });
  };

  const handleInputField = (event) => {
    updateInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };
  const footerSaveButton = () => {
    alert("Schema Saved Successfully");
    console.log(inputValue);
    updateOpen(false);
    updateShowValue([...showValue, inputValue]);
  };

  return (
    <div className="container">
      <Button className="green_button" onClick={showDrawer}>
        Save Segment
      </Button>
      <div>
        {showValue.length > 0 ? (
          <>
            <h2>First Name :- {`${inputValue.firstName}`}</h2>
            <h2>Last Name :- {`${inputValue.lastName}`}</h2>
            <h2>Account Name :- {`${inputValue.accountName}`}</h2>
            <h2>Age :- {`${inputValue.age}`}</h2>
            <h2>Gender :- {`${inputValue.gender}`}</h2>
            <h2>City :- {`${inputValue.city}`}</h2>
            <h2>State :- {`${inputValue.state}`}</h2>
          </>
        ) : null}
      </div>
      <div className="drawer_container">
        <Drawer
          title={
            <span className="drawer_title">
              <i
                className="fa-solid fa-angle-left drawer_title_icon"
                onClick={() => onClose()}
              ></i>
              Saving Segment
            </span>
          }
          closable={false}
          open={open}
          styles={{
            header: {
              color: "white",
              backgroundColor: "cadetblue",
            },
          }}
        >
          <div className="body_container">
            <p>Enter the Name of the Segment</p>
            <input
              name="segmentName"
              className="input_box_style"
              placeholder="Name of the Segment"
            />
            <p>
              To save your segment,You need to add the schemas to build the
              query
            </p>
            <div>
              <Space direction="horizondal" className="space_align">
                <Badge color="Green" text="- User Traks" />
                <Badge color="Red" text="- Group Traks" />
              </Space>
            </div>
            {manualSchema.firstName && (
              <div className="details_container">
                <Badge dot className="custom_badge" color="Green" />
                <div className="input_container">
                  <input
                    name="firstName"
                    value={inputValue.firstName}
                    className="input_box_style"
                    placeholder="First Name"
                    onChange={handleInputField}
                    required
                  />
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <i
                  className="fa-solid fa-minus minus_symbol"
                  onClick={() => handleToRemoveManual("firstName")}
                ></i>
              </div>
            )}
            {manualSchema.accountName && (
              <div className="details_container1">
                <Badge dot className="custom_badge" color="Red" />
                <div className="input_container">
                  <input
                    name="accountName"
                    value={inputValue.accountName}
                    className="input_box_style"
                    placeholder="Account Name"
                    onChange={handleInputField}
                    required
                  />
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <i
                  className="fa-solid fa-minus minus_symbol"
                  onClick={() => handleToRemoveManual("accountName")}
                ></i>
              </div>
            )}
            {selectedSchema.map((schema, index) => (
              <div key={schema.value || index} className="details_container1">
                <Badge dot className="custom_badge" color="Green" />
                <div className="input_container">
                  <input
                    name={schema.value}
                    value={inputValue[schema.value] || ""}
                    className="input_box_style"
                    placeholder={schema.label}
                    onChange={handleInputField}
                    required
                  />
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <i
                  className="fa-solid fa-minus minus_symbol"
                  onClick={() => handleToRemove(schema.value)}
                ></i>
              </div>
            ))}
            {visibilityOfAddSchematoSegment ? (
              <div className="details_container1">
                <Select
                  style={{ width: "100%" }}
                  value={newSchema || "Select schema"}
                  onChange={handleToSelectOption}
                  defaultValue="Select schema"
                >
                  {availableSchema.map((schema) => (
                    <Option key={schema.value} value={schema.value}>
                      {schema.label}
                    </Option>
                  ))}
                </Select>
              </div>
            ) : (
              <>
                <div className="details_container1">
                  <Badge dot className="custom_badge" color="Gray" />
                  <div className="input_container">
                    <input
                      name="accountName"
                      className="input_box_style"
                      placeholder="Add schema to Segment"
                      onClick={() => handleToAddSegment()}
                    />
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  <i className="fa-solid fa-minus minus_symbol"></i>
                </div>
              </>
            )}
            <div
              className="add_schema"
              onClick={() => handleToAddSegmentButton()}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add new schema</span>
            </div>
          </div>
          <footer className="footer_container">
            <Button className="save_btn" onClick={() => footerSaveButton()}>
              Save the Segment
            </Button>
            <Button className="cancel_btn" onClick={() => onClose()}>
              Cancel
            </Button>
          </footer>
        </Drawer>
      </div>
    </div>
  );
};

export default DrawerComponent;
