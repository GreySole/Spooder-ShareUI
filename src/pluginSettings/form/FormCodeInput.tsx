import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
  Button,
  Columns,
  Stack,
  TypeFace,
} from "@greysole/spooder-component-library";
interface TextInputProps {
  formKey: string;
  label?: string;
}
export default function FormCodeInput(props: TextInputProps) {
  const { formKey, label } = props;
  const { register, watch } = useFormContext();
  const value = watch(formKey);
  return (
    <Stack spacing="small">
      <Columns spacing="medium">
        <TypeFace fontSize="large">{label} </TypeFace>
      </Columns>
      <CodeEditor
        id={`code-${formKey}`}
        className="response-code-editor"
        language="js"
        placeholder="return 'Hello '+event.displayName"
        style={{ fontSize: "1rem" }}
        value={value}
        {...register(formKey)}
      />
    </Stack>
  );
}
