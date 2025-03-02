import React from "react";
import {
  BoolSwitch,
  Border,
  Box,
  Button,
  Expandable,
  FormBoolSwitch,
  FormTextInput,
  Stack,
  TypeFace,
} from "@greysole/spooder-component-library";
import { useFormContext } from "react-hook-form";
import useEvents from "../../../app/hooks/useEvents";
import FormCodeInput from "./FormCodeInput";

export default function CreateCommandForm() {
  const { getValues } = useFormContext();
  const { getVerifyResponseScript } = useEvents();
  const { verifyResponseScript } = getVerifyResponseScript();
  const [verifyScriptResponse, setVerifyScriptResponse] = React.useState(
    "Write your code in the above editor and click Verify Script. The result of the script will print here. Use the Input Message field to simulate a chat message and trigger the command."
  );
  const [verifyScriptStatus, setVerifyScriptStatus] = React.useState("");

  const verifyBorderColor =
    verifyScriptStatus !== ""
      ? verifyScriptStatus === "error"
        ? "red"
        : "green"
      : undefined;

  return (
    <Stack spacing="medium" padding="medium">
      <FormTextInput label="Command" formKey="command" />
      <Expandable label="Permissions">
        <FormBoolSwitch label="Broadcaster" formKey="broadcaster" />
        <FormBoolSwitch label="Moderator" formKey="mod" />
        <FormBoolSwitch label="Subscriber" formKey="sub" />
        <FormBoolSwitch label="VIP" formKey="vip" />
      </Expandable>
      <Box flexFlow="column">
        <FormCodeInput label="Script" formKey="script" />
        <Box flexFlow="column" marginTop="medium">
          <Stack spacing="medium">
            <Border borderColor={verifyBorderColor}>
              <Box flexFlow="row" padding="medium">
                <TypeFace>{verifyScriptResponse}</TypeFace>
              </Box>
            </Border>
            <FormTextInput placeholder="Input Message" formKey="inputMessage" />
            <Button
              label="Verify Script"
              onClick={() => {
                const values = getValues();
                verifyResponseScript(
                  values.command,
                  values.inputMessage,
                  values.script
                ).then((res) => {
                  setVerifyScriptResponse(res.data.response);
                  setVerifyScriptStatus(res.data.status);
                });
              }}
            />
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}
