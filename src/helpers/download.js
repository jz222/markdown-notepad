export default (content) => {
    content = content.replace(/\n/g, "\r\n");

    const blob = new Blob([content], { type: "text/plain" });

    const a = document.createElement("a");

    a.style.display = "none";
    a.download = "markdown.md";
    a.href = window.URL.createObjectURL(blob);
    a.target = "_blank";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
};