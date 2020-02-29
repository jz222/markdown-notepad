<style lang="scss">
    @import "app.scss";
</style>

<script>
    // Libs
    import { onMount } from "svelte";
    import purify from "dompurify";
    import marked from "marked"

    // Components
    import Toggle from "components/Toggle.svelte";
    import Button from "components/Button.svelte";

    // Helpers
    import debounce from "helpers/debounce";
    import download from "helpers/download";

    // Nodes
    let inputArea;
    let previewArea;

    // States
    let lineClicked = false;
    let markdownView = true;

    // Editor
    let width = localStorage.getItem("editor-width") || "";
    let widthPercentage = 50;
    let inputAreaWidth;
    let value = localStorage.getItem("editor-content") || "";
    let chars;
    let words;
    let selectedChars = 0;
    let markdown;


    /**
     * Debounce code highlighting on
     * input for better performance.
     * @type {function(...[*]=)}
     */
    const debouncedHighlightMarkdown = debounce(highlightMarkdown, 800);


    /**
     * Calculates how many characters are selected in the input area.
     * @returns {*|number} the number of selected characters.
     */
    const getSelectedTextLength = () => inputArea && value.substring(inputArea.selectionStart, inputArea.selectionEnd).length;


    /**
     * Calculates the width of the input area when the window is resized.
     */
    function resizeHandler() {
        width = window.innerWidth * (widthPercentage / 100);
        localStorage.setItem("editor-width", inputArea.getBoundingClientRect().width.toString());
    }


    /**
     * Updates the selected character count.
     */
    function selectionHandler() {
        selectedChars = getSelectedTextLength();
    }


    /**
     * Registers that the line in the middle was clicked. This is necessary to
     * distinguish between clicks on the line and any other clicks.
     */
    function downHandler() {
        lineClicked = true;
    }


    /**
     * Updates the width of the input area as the line
     * in the middle is focused and moved horizontally.
     * @param e {object} event object
     */
    function moveHandler(e) {
        selectedChars = getSelectedTextLength();

        if (lineClicked) {
            width = e.clientX;
            widthPercentage = (width * 100) / window.innerWidth;
        }
    }


    /**
     * Registers when the mouse click was released and stores the current
     * input area width in the localstorage.
     */
    function upHandler() {
        lineClicked = false;
        localStorage.setItem("editor-width", inputArea.getBoundingClientRect().width.toString());
    }


    /**
     * Synchronizes the scroll position of the input area
     * with the scroll position of the preview area.
     */
    function synchronizeScroll() {
        const scrollPercentage = (inputArea.scrollTop / (inputArea.scrollHeight - inputArea.clientHeight));
        previewArea.scrollTop = (previewArea.scrollHeight - previewArea.clientHeight) * scrollPercentage;
    }


    /**
     * Resets the text selection in the input area.
     */
    function resetSelection() {
        selectedChars = 0;
        inputArea.selectionEnd = 0;
        inputArea.selectionStart = 0;
    }


    /**
     * Highlights code blocks in the preview area.
     */
    function highlightMarkdown() {
        previewArea.querySelectorAll("pre code").forEach((block) => {
            window.hljs.highlightBlock(block);
        });
        synchronizeScroll();
    }


    /**
     * Regularly stores the current input in the localstorage.
     */
    setInterval(() => localStorage.setItem("editor-content", value), 2500);


    /**
     * Focuses the input area, sets the input area width and highlights
     * code blocks in the preview area on mount.
     */
    onMount(() => {
        inputArea.focus();
        widthPercentage = (width * 100) / window.innerWidth;
        highlightMarkdown();
    });


    $: inputAreaWidth = "width: " + (markdownView ? width + "px;" : "100%;");
    $: chars = value.length;
    $: words = (value.match(/[\w\d\’\'-]+/gi) || []).length;
    $: markdown = marked(purify.sanitize(value));
</script>


<nav>
    <Button label="Download" click="{() => download(value)}"/>
    <Toggle bind:checked={markdownView}/>
</nav>

<main on:mousemove={moveHandler} on:mouseup={upHandler} class:markdownView>
    <textarea
        on:select={selectionHandler}
        on:scroll={synchronizeScroll}
        on:keyup={debouncedHighlightMarkdown}
        bind:this={inputArea}
        bind:value
        aria-label="input area"
        style="{inputAreaWidth}"
    />

    <div class="line" on:mousedown={downHandler} hidden="{!markdownView}"></div>

    <div class="previewArea" bind:this={previewArea} hidden="{!markdownView}">{@html markdown}</div>
</main>

<footer>
    <div>
        <span>Words: {words}</span>
        <span>Chars: {chars}</span>
        <span>Selected: {selectedChars}</span>
    </div>

    <a href="https://github.com/jz222/markdown-notepad" target="_blank" rel="noreferrer">Fork on GitHub</a>
</footer>

<svelte:window on:resize={resizeHandler} on:mousedown={resetSelection}/>