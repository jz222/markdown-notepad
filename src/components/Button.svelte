<script>
    export let label;
    export let click;
</script>

<style>
    button {
        height: 3rem;
        padding: 0 1.5rem;
        border: none;
        border-radius: 2rem;
        background-color: var(--color-secondary);
        font-size: var(--font-size-smaller);
        letter-spacing: 0.1rem;
        color: var(--color-primary);
        cursor: pointer;
    }
</style>

<button on:click={click}>{label}</button>