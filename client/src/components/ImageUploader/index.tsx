import { UploadArea, UploadIndicator } from "./Avatar.styled";
import UploadIcon from "@mui/icons-material/Upload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { memo } from "react";

interface props {
  profile: any;
  id: string;
}

const ImageUploader = ({ profile, id }: props) => {
  return (
    <>
      <UploadArea htmlFor={id}>
        {!profile ? (
          <>
            <CameraAltIcon />
            <UploadIndicator>
              <UploadIcon />
              <p>Upload Profile</p>
            </UploadIndicator>
          </>
        ) : (
          <img src={profile} alt="x" />
        )}
      </UploadArea>
    </>
  );
};

export default memo(ImageUploader);
