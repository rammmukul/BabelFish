<script lang="ts">
    import { onMount } from "svelte";
    import {
        CaretDownSolid,
        PhoneSolid,
        CheckSolid,
    } from "flowbite-svelte-icons";
    import sound from "../../public/icons8-sound.gif";
    import fish from "../../public/fish.png";

    import { fly } from "svelte/transition";

    let langMap = {
        English: "en",
        Hindi: "hi",
        Kannada: "kn",
        Malayalam: "ml",
        Tamil: "ta",
        Bengali: "bn",
    };

    let leg1Speaking = false;
    let leg1Number = "";
    let leg2Number = "";

    let leg1lang = "Select User 1 Language";
    let leg2lang = "Select User 2 Language";

    let leg1langOpen = false;
    let leg2langOpen = false;

    let leg1Text = [];
    let leg2Text = [];

    onMount(() => {
        async function fetchData() {
            if (!callOngoing) return;
            let res = await fetch(
                "http://140.238.245.209:8081/v1/transcript",
            ).then((r) => r.json());
            leg1Text = res.caller_transcript;
            leg2Text = res.callee_transcript;
            leg1Scroll &&
                leg2Scroll &&
                setTimeout(() => {
                    leg1Scroll.scrollTo({ top: leg1Scroll.scrollHeight });
                    leg2Scroll.scrollTo({ top: leg2Scroll.scrollHeight });
                }, 200);
        }

        const interval = setInterval(fetchData, 2000);
        fetchData();

        return () => clearInterval(interval);
    });

    let leg1Scroll: HTMLElement = null;
    let leg2Scroll: HTMLElement = null;

    let callOngoing = false;

    async function onCall() {
        if (callOngoing) return (callOngoing = false);
        leg1Text = [];
        leg2Text = [];
        let leg1LangCode = langMap[leg1lang];
        let leg2LangCode = langMap[leg2lang];
        callOngoing = true;
        await fetch(
            `http://140.238.245.209:8081/v1/call?from=${leg1Number}&to=${leg2Number}&from_lang=${leg1LangCode}&to_lang=${leg2LangCode}`,
        );
    }
</script>

<main>
    <img
        id="fish"
        src={fish.src}
        alt=""
        class="absolute rotate-45 translate-x-[800px] -translate-y-10 w-32"
    />
    <div id="call" class="rounded-lg p-5 z-10">
        <input
            id="leg1-phone"
            type="text"
            placeholder="User 1 Number"
            class="phone-number input input-bordered w-full max-w-xs self-center justify-self-center"
            bind:value={leg1Number}
        />
        <input
            id="leg2-phone"
            type="text"
            placeholder="User 2 Number"
            class="phone-number input input-bordered w-full max-w-xs self-center justify-self-center"
            bind:value={leg2Number}
        />

        <div
            id="leg1-lang"
            class="dropdown dropdown-bottom flex justify-center dropdown-open"
        >
            <div
                tabindex="0"
                role="button"
                class="btn m-1 w-80 flex justify-between"
                on:click={() => (leg1langOpen = !leg1langOpen)}
            >
                <span>
                    {leg1lang}
                </span>
                {#if !leg1langOpen}
                    <span transition:fly={{ y: 10 }}>
                        <CaretDownSolid size="xs" class="w-4 h-4" />
                    </span>
                {/if}
            </div>
            {#if leg1langOpen}
                <ul
                    tabindex="0"
                    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80"
                >
                    <li
                        on:click={() => {
                            leg1lang = "English";
                            leg1langOpen = false;
                        }}
                    >
                        <a>English</a>
                    </li>
                    <li
                        on:click={() => {
                            leg1lang = "Hindi";
                            leg1langOpen = false;
                        }}
                    >
                        <a>Hindi</a>
                    </li>
                    <li
                        on:click={() => {
                            leg1lang = "Kannada";
                            leg1langOpen = false;
                        }}
                    >
                        <a>Kannada</a>
                    </li>
                    <li
                        on:click={() => {
                            leg1lang = "Malayalam";
                            leg1langOpen = false;
                        }}
                    >
                        <a>Malayalam</a>
                    </li>
                    <li
                        on:click={() => {
                            leg1lang = "Tamil";
                            leg1langOpen = false;
                        }}
                    >
                        <a>Tamil</a>
                    </li>
                    <li
                        on:click={() => {
                            leg1lang = "Bengali";
                            leg1langOpen = false;
                        }}
                    >
                        <a>Bengali</a>
                    </li>
                </ul>
            {/if}
        </div>
        <div
            id="leg2-lang"
            class="dropdown dropdown-bottom dropdown-open flex justify-center"
        >
            <div
                tabindex="0"
                role="button"
                class="btn m-1 w-80 flex justify-between"
                on:click={() => (leg2langOpen = !leg2langOpen)}
            >
                <span>
                    {leg2lang}
                </span>
                {#if !leg2langOpen}
                    <span transition:fly={{ y: 10 }}>
                        <CaretDownSolid size="xs" class="w-4 h-4" />
                    </span>
                {/if}
            </div>
            {#if leg2langOpen}
                <ul
                    tabindex="0"
                    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80"
                >
                    <li
                        on:click={() => {
                            leg2lang = "English";
                            leg2langOpen = false;
                        }}
                    >
                        <a>English</a>
                    </li>
                    <li
                        on:click={() => {
                            leg2lang = "Hindi";
                            leg2langOpen = false;
                        }}
                    >
                        <a>Hindi</a>
                    </li>
                    <li
                        on:click={() => {
                            leg2lang = "Kannada";
                            leg2langOpen = false;
                        }}
                    >
                        <a>Kannada</a>
                    </li>
                    <li
                        on:click={() => {
                            leg2lang = "Malayalam";
                            leg2langOpen = false;
                        }}
                    >
                        <a>Malayalam</a>
                    </li>
                    <li
                        on:click={() => {
                            leg2lang = "Tamil";
                            leg2langOpen = false;
                        }}
                    >
                        <a>Tamil</a>
                    </li>
                    <li
                        on:click={() => {
                            leg2lang = "Bengali";
                            leg2langOpen = false;
                        }}
                    >
                        <a>Bengali</a>
                    </li>
                </ul>
            {/if}
        </div>

        <span id="call-btn-container">
            <span
                transition:fly
                class="leg1 check mt-7 mb-7 p-7 bg-blue-300 hover:bg-blue-200 active:bg-blue-400 {callOngoing &&
                !leg1Speaking
                    ? ''
                    : 'hide'}"
                on:click={() => {
                    fetch(`http://140.238.245.209:8081/v1/stoptranslation?from=caller`);
                    leg1Speaking = true;
                }}
            >
                <CheckSolid />
            </span>
            <button
                on:click={onCall}
                class="call-btn w-32 h-32 bg-green-500 hover:bg-green-300 active:bg-green-700 flex justify-center items-center"
                style="border-radius: 9999px;"
            >
                {#if callOngoing}
                    <img id="sound" src={sound.src} alt="" />
                {:else}
                    <PhoneSolid class="w-10 h-10" />
                {/if}
            </button>

            <span
                transition:fly
                class="leg2 check mt-7 mb-7 p-7 bg-blue-300 hover:bg-blue-200 active:bg-blue-400 {callOngoing &&
                leg1Speaking
                    ? ''
                    : 'hide'}"
                on:click={() => {
                    fetch(`http://140.238.245.209:8081/v1/stoptranslation?from=callee`);
                    leg1Speaking = false;
                }}
            >
                <CheckSolid />
            </span>
        </span>
    </div>
    <div id="leg1" class="rounded-lg">
        <div class="overflow p-5 h-full" bind:this={leg1Scroll}>
            <span>
                {#each leg1Text as sentence}
                    <span class="sentence">
                        {" " + sentence}
                    </span>
                    <hr />
                {/each}
            </span>
        </div>
    </div>
    <div id="leg2" class="rounded-lg">
        <div class="overflow p-5 h-full" bind:this={leg2Scroll}>
            <span>
                {#each leg2Text as sentence}
                    <span class="sentence">
                        {" " + sentence}
                    </span>
                    <hr />
                {/each}
            </span>
        </div>
    </div>
</main>

<style>
    main {
        height: 100vh;
        width: 100vw;
        background: linear-gradient(
            -45deg,
            rgba(225, 225, 255, 0.8) 0%,
            rgba(220, 255, 247, 0.8) 100%
        );

        display: grid;
        grid-template-areas:
            "call call"
            "leg1 leg2";
        grid-template-columns: 1fr 1fr;
        gap: 3em;
        padding: 3em;
    }

    .leg1.check {
        border-top-left-radius: 999px;
        border-bottom-left-radius: 999px;
        transform: translateX(18px);
    }

    .leg2.check {
        border-top-right-radius: 999px;
        border-bottom-right-radius: 999px;
        transform: translateX(-18px);
    }

    .call-btn {
        z-index: 10;
    }

    .phone-number {
        grid-row: 1;
    }

    #leg1-phone {
        grid-column: 1;
    }
    #leg2-phone {
        grid-column: 2;
    }

    @keyframes slidein {
        from {
            padding-left: 10px;
            opacity: 50%;
        }

        to {
            padding-left: 0;
            opacity: 100%;
        }
    }

    hr {
        border-color: #999;
        border-style: dashed;
    }

    #sound {
        mix-blend-mode: multiply;
    }

    .sentence {
        animation-duration: 1s;
        animation-name: slidein;
    }

    #call {
        grid-area: call;
        background: #f7ddff;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: end;
        gap: 3em;
        padding-bottom: 6em;
    }

    .hide {
        opacity: 0;
    }

    #call-btn-container {
        display: flex;
        justify-content: center;
        transform: translateY(140%);
        grid-column: 1/3;
        grid-row: 1;
        margin: auto;
    }

    #leg2-lang {
        align-self: flex-end;
        grid-row: 1;
        grid-column: 2;
    }

    #leg1-lang {
        grid-row: 1;
        grid-column: 1;
    }

    #leg1 {
        background: #e1e1ff;
        color: #8585fe;
        font-size: 2.5rem;
        height: 50vh;
        overflow: hidden;
        scrollbar-width: none;
    }

    #leg2 {
        background: #dcfff7;
        color: #5ec1ac;
        font-size: 2.5rem;
        height: 50vh;
        overflow: hidden;
        scrollbar-width: none;
    }

    .overflow {
        overflow-y: scroll;
        width: calc(100% + 15px);
    }
</style>
