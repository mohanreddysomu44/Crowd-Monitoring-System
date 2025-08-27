import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
  name = "content",
  control,
  label,
  defaultValue = "",
}) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

              // ✅ Custom image upload handler
              images_upload_handler: async (blobInfo, success, failure) => {
                try {
                  const file = blobInfo.blob();

                  // Replace this with your Appwrite upload logic
                  const response = await appwriteService.uploadEditorImage(
                    file
                  );

                  if (response && response.$id) {
                    const imageUrl = appwriteService.getFilePreview(
                      response.$id
                    );
                    success(imageUrl); // ✅ Insert image into editor
                  } else {
                    failure("Upload failed");
                  }
                } catch (err) {
                  console.error("Image upload error:", err);
                  failure("Upload error");
                }
              },
            }}
          />
        )}
      />
    </div>
  );
}
