import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@mui/styles";
import { Controller, useFormContext } from "react-hook-form";

const useStyles = makeStyles({
  editor: {
    border: "1px solid #393E46",
    borderRadius: "4px",
    minHeight: "200px",
    "& .ql-toolbar": {
      border: "none",
      borderBottom: "1px solid #393E46",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      backgroundColor: "#FFD369",
      "& .ql-picker": {
        color: "#333",
      },
      "& .ql-picker-options": {
        backgroundColor: "#FFD369",
        boxShadow: "none",
        border: "1px solid #393E46",
      },
    },
    // "& .": {

    // }
    "& .ql-container": {
      fontFamily: "inherit",
      fontSize: "inherit",
      minHeight: "150px",
      maxHeight: "400px",
      overflowY: "auto",
      padding: "10px",
      border: "none",
    },
  },
});

function RichTextEditor({ name, ...props }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const classes = useStyles();

  return (
    <>
      {errors && <p className="font-semibold text-red-500">Required</p>}
      <div className={classes.editor}>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{ required: !props.noValidate }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <ReactQuill
              theme="snow"
              value={value}
              onChange={(e) => {
                console.log(e);
                onChange(e);
              }}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
              ]}
              placeholder="Type something..."
            />
          )}
        />
      </div>
    </>
  );
}

export default RichTextEditor;
