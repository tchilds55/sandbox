const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Get the directory name from command line arguments
const directoryPath = process.argv[2];

function readJsFiles(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    // Create docs directory if it doesn't exist
    const docsDir = path.join(process.cwd(), "docs");
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir);
    }

    files.forEach((file) => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        readJsFiles(fullPath);
      } else if (path.extname(fullPath) === ".js") {
        fs.readFile(fullPath, "utf8", async (err, data) => {
          if (err) {
            console.error("Error reading file:", err);
            return;
          }

          // Prepare the request payload
          data =
            "This is a react file. Please describe the purpose of the component, it's props, indicate if state is received from props or a context and its functionality. " +
            "After going through all files, generate a component hierarchy. " +
            "Make sure the markdown can be rendered in a markdown editor, don't add any other formatting like ```markdown. " +
            "Provide your answer in markdown format: " +
            data;
          const payload = {
            model: "anthropic:claude-3-5-sonnet",
            messages: [
              {
                role: "user",
                content: data,
              },
            ],
          };

          try {
            const response = await axios.post(
              "https://proxy.shopify.ai/v1/chat/completions",
              payload,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Bearer shopify-eyJpZCI6ImMwODM3MDBhZDYzYTk2Y2Y3ODdhOThkYzI4NTI5OGMxIiwibW9kZSI6InBlcnNvbmFsIiwiZW1haWwiOiJ0YW1taWUuY2hpbGRzQHNob3BpZnkuY29tIiwiZXhwaXJ5IjoxNzMyNjY1NTY2fQ==-lDbKWfoRpqOLwGh5pN1npo8DT3KpefHZGO2R9alYLaU=",
                },
              }
            );

            const markdownContent = response.data.choices[0].message.content;

            // Create markdown filename based on the original JS file
            const fileName = path.basename(fullPath, ".js");
            const markdownPath = path.join(docsDir, `${fileName}.md`);

            // Write the markdown file
            fs.writeFileSync(markdownPath, markdownContent);

            console.log(`Documentation written to: ${markdownPath}`);
          } catch (error) {
            console.error(`Error processing ${fullPath}:`, error.message);
          }
        });
      }
    });
  });
}

// Start reading from the provided directory
readJsFiles(path.resolve(__dirname, directoryPath));
