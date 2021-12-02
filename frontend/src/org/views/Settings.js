import React from "react";
import DashboardBase from "../components/DashboardBase";
import "../../../stylesheets/org/Settings.scss";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ControlledTextField from "$components/ControlledTextField";
import { useForm } from "react-hook-form";
const Settings = () => {
  const [orgLogoFile, setOrgLogoFile] = React.useState({ file: "../../static/assets/image.png" });
  const [logoUploaded, setLogoUploaded] = React.useState(false);

  const { control } = useForm();
  const [orgForm, setOrgForm] = React.useState({
    name: null,
    short_name: null,
    desc: null,
    org_body: null,
    logo: null,
    facebook: null,
    instagram: null,
    twitter: null,
    linkedin: null,
    website: null,
  });

  const uploadChange = (evt) => {
    setOrgLogoFile({
      file: URL.createObjectURL(evt.target.files[0]),
    });
    setLogoUploaded(true);
  };

  const handleOrgNameChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        name: e,
      };
    });
  };

  const handleOrgShortHandChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        short_name: e,
      };
    });
  };

  const handleOrgDescChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        desc: e,
      };
    });
  };

  const handleOrgBodyChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        org_body: e,
      };
    });
  };

  const handleFacebookChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        facebook: e,
      };
    });
  };

  const handleTwitterChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        twitter: e,
      };
    });
  };

  const handleInstagramChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        instagram: e,
      };
    });
  };

  const handleLinkedInChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        linkedin: e,
      };
    });
  };

  const handleWebsiteChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        website: e,
      };
    });
  };

  return (
    <div>
      <DashboardBase />
      <div className="settings">
        <h1 className="title">Org Information</h1>
        <ControlledTextField
          label={"Organization Name*"}
          control={control}
          margin="dense"
          variant={"outlined"}
          style={{ width: "464px" }}
          onChange={(e) => {
            handleOrgNameChange(e.target.value);
          }}
        />
        <TextField
          label={"Shorthand Name*"}
          margin="dense"
          variant={"outlined"}
          style={{ width: "464px" }}
          onChange={(e) => {
            handleOrgShortHandChange(e.target.value);
          }}
        />
        <TextField
          label={"Short Description*"}
          margin="dense"
          variant={"outlined"}
          style={{ width: "464px" }}
          multiline
          rows={8}
          onChange={(e) => {
            handleOrgDescChange(e.target.value);
          }}
        />
        <FormControl variant="outlined" margin="dense">
          <InputLabel>Org body*</InputLabel>
          <Select
            variant={"outlined"}
            margin="dense"
            label={"Org Body*"}
            style={{ width: "464px" }}
            onChange={(e) => handleOrgBodyChange(e.target.value)}
          >
            <MenuItem value="COA">COA</MenuItem>
            <MenuItem value="LIONS">LIONS</MenuItem>
            <MenuItem value="Sanggu">Sanggu</MenuItem>
          </Select>
        </FormControl>
        <h1 className="body-title">Org Logo</h1>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="org_logo_input"
          onChange={(evt) => uploadChange(evt)}
        />
        <label htmlFor="org_logo_input">
          <div className="org_logo_upload">
            <img
              src={`${logoUploaded ? orgLogoFile.file : "../../static/assets/image.png"}`}
              alt=""
            />
          </div>
        </label>
        <p class="image-subtitle">Suggested ratio — 1:1 (ex. 800x800px)</p>
        <h1 className="body-title">Org Social Media</h1>
        <h5 className="social-media-header">Facebook</h5>
        <TextField
          label={"Facebook"}
          margin="dense"
          variant={"outlined"}
          style={{ width: "464px" }}
          onChange={(e) => {
            handleFacebookChange(e.target.value);
          }}
        />
        <h5 className="social-media-header">Instagram</h5>
        <TextField
          label={"Instagram*"}
          margin="dense"
          variant={"outlined"}
          style={{ width: "464px" }}
          onChange={(e) => {
            handleInstagramChange(e.target.value);
          }}
        />
        <h5 className="social-media-header">Twitter</h5>
        <TextField
          label={"Twitter*"}
          margin="dense"
          variant={"outlined"}
          style={{ width: "464px" }}
          onChange={(e) => {
            handleTwitterChange(e.target.value);
          }}
        />
        <h5 className="social-media-header">LinkedIn</h5>
        <TextField
          label={"LinkedIn*"}
          margin="dense"
          variant={"outlined"}
          style={{ width: "464px" }}
          onChange={(e) => {
            handleLinkedInChange(e.target.value);
          }}
        />
        <h5 className="social-media-header">Website</h5>
        <TextField
          label={"Website*"}
          margin="dense"
          variant={"outlined"}
          style={{ width: "464px" }}
          onChange={(e) => {
            handleWebsiteChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
