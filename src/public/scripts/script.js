const message = document.querySelector(".msg");
const image = document.querySelector("#image");
const spinner = document.querySelector(".spinner");

const toggleSpinner = () => spinner.classList.toggle("show");

const generateImageRequest = async (prompt, size) => {
  try {
    toggleSpinner();

    console.log(prompt, size);

    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, size }),
    });

    if (!response.ok) {
      toggleSpinner();
      throw new Error("That image could not be generated");
    }
    const data = await response.json();
    image.src = data.imageUrl;
    toggleSpinner();
  } catch (err) {
    message.textContent = err;
  }
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;
  console.log(prompt, size);

  generateImageRequest(prompt, size);
};

document.querySelector("#image-form").addEventListener("submit", onFormSubmit);
