import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
  Button,
  Columns,
  Stack,
  TypeFace,
  useTheme,
} from "@spooder/webui-component-library";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import ResponseCommandCheatSheet from "./modCommands/cheatSheet/ResponseCommandCheatSheet";
interface TextInputProps {
  formKey: string;
  label?: string;
}
export default function FormCodeInput(props: TextInputProps) {
  const { formKey, label } = props;
  const { register, watch } = useFormContext();
  const [responseCheatSheetOpen, setResponseCheatSheetOpen] = useState(false);
  const { themeVariables } = useTheme();
  const { isDarkTheme } = themeVariables;
  const value = watch(formKey);
  return (
    <Stack spacing="small">
      <Columns spacing="medium">
        <TypeFace fontSize="large">{label} </TypeFace>
        <Button
          icon={faQuestionCircle}
          iconSize="large"
          onClick={() => {
            setResponseCheatSheetOpen(!responseCheatSheetOpen);
          }}
        />
      </Columns>
      <ResponseCommandCheatSheet isOpen={responseCheatSheetOpen} />
      <CodeEditor
        id={`code-${formKey}`}
        className="response-code-editor"
        language="js"
        placeholder="return 'Hello '+event.displayName"
        style={{
          fontSize: "1rem",
          backgroundColor: isDarkTheme ? "#1e1e1e" : "#ffffff",
          color: isDarkTheme ? "#ffffff" : "#000000",
        }}
        value={value}
        {...register(formKey)}
      />
    </Stack>
  );
}
