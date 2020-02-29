<script>
    export let checked;
</script>

<style lang="scss">
    input:checked + .slider {
        background-color: var(--color-secondary);

        &:before {
            transform: translateX(2.2rem);
        }
    }

    label {
        position: relative;
        width: 4.4rem;
        height: 2.2rem;
        display: inline-block;
        margin-left: 1rem;

        input {
            width: 0;
            height: 0;
            opacity: 0;
        }
    }

    .wrapper {
        display: flex;
        align-items: center;
        font-weight: bold;
        color: var(--color-primary);
    }

    .slider {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 3.5rem;
        background-color: var(--color-background-dark);
        box-shadow: 0 0 0.1rem var(--color-secondary);
        transition: background-color 0.4s;
        cursor: pointer;

        &:before {
            content: "";
            position: absolute;
            bottom: 0.3rem;
            left: 0.3rem;
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 50%;
            background-color: var(--color-primary);
            transition: background-color 0.4s, transform 0.4s;
        }
    }
</style>

<div class="wrapper">
    <span>Markdown</span>

    <label>
        <input type="checkbox" aria-label="toggle markdown" bind:checked />
        <span class="slider"></span>
    </label>
</div>