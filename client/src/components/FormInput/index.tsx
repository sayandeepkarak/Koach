import { ReactNode, memo, useState, ChangeEventHandler } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  ErrorText,
  InputBlock,
  ModalInputArea,
  SelectInput,
} from "./FormInput.styled";

interface props {
  name: string;
  id: string;
  placeholder: string;
  value: string;
  type?: string;
  icon?: ReactNode;
  isSelect?: boolean;
  selectOptions?: string[] | null;
  isPassword?: boolean;
  change: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  blur: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  error: string | undefined;
  touched: boolean | undefined;
}

const Modalnput = ({
  id,
  name,
  placeholder,
  value,
  type,
  icon,
  isSelect,
  selectOptions,
  isPassword,
  change,
  error,
  touched,
  blur,
}: props) => {
  return (
    <InputBlock>
      <ModalInputArea error={touched && error ? "yes" : "no"}>
        {icon && <label htmlFor={id}>{icon}</label>}
        {!isSelect ? (
          isPassword ? (
            <PasswordInput
              id={id}
              name={name}
              placeholder={placeholder}
              change={change}
              value={value}
              blur={blur}
            />
          ) : (
            <input
              id={id}
              name={name}
              type={type}
              value={value}
              onChange={change}
              placeholder={placeholder}
              onBlur={blur}
            />
          )
        ) : (
          <SelectInput id={id} value={value} onBlur={blur} onChange={change}>
            <option value="" disabled>
              {placeholder}
            </option>
            {selectOptions?.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </SelectInput>
        )}
      </ModalInputArea>
      {touched && error && <ErrorText>{error}</ErrorText>}
    </InputBlock>
  );
};

interface togglerProps {
  name: string;
  id: string;
  placeholder: string;
  value: string;
  change: ChangeEventHandler<HTMLInputElement>;
  blur: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

const PasswordInput = ({
  id,
  name,
  placeholder,
  value,
  change,
  blur,
}: togglerProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={change}
        onBlur={blur}
      />
      <span onClick={() => setVisible((old) => !old)}>
        {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </span>
    </>
  );
};

export default memo(Modalnput);
