<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { DoorOpen, Volume2, VolumeX, AlertTriangle } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const status = $page.status;
	const error = $page.error;

	// Backrooms-specific lore for errors
	let errorTitle = status === 404 ? 'Level 404: The Missing Sector' : 'Entity Contact';
	let errorDescription = status === 404 
        ? "You've noclipped into a sector that hasn't rendered yet. The geometry here is unstable." 
        : "An unknown entity has corrupted the data stream.";

    if (error?.message) {
        errorDescription = error.message;
    }

	// Audio Logic (No Autoplay)
	let audioElement: HTMLAudioElement;
	let isMuted = true;

	function toggleMute() {
		if (!audioElement) return;
		isMuted = !isMuted;
		audioElement.muted = isMuted;
		if (!isMuted) {
			audioElement.volume = 0.15; // Low hum volume
			audioElement.play().catch(() => { isMuted = true; });
		}
	}
    
    // Camcorder timestamp
    let timestamp = '';
    onMount(() => {
        const interval = setInterval(() => {
            const now = new Date();
            timestamp = now.toLocaleTimeString('en-US', { hour12: false }) + ':' + now.getMilliseconds().toString().padStart(3, '0');
        }, 43);
        return () => clearInterval(interval);
    });
</script>

<svelte:head>
	<title>NO_CLIP_ERROR | {status}</title>
    <meta name="theme-color" content="#d4cd92">
</svelte:head>

<div class="fixed inset-0 z-[100] w-screen h-screen bg-[#d4cd92] overflow-hidden font-mono text-stone-800 selection:bg-black selection:text-[#d4cd92]">
    
    <div class="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none wallpaper-pattern"></div>
    
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_120%)] pointer-events-none"></div>

    <div class="absolute inset-0 bg-amber-100/20 animate-flicker pointer-events-none mix-blend-overlay"></div>

    <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_4px,6px_100%]"></div>

    <div class="relative z-10 flex flex-col items-center justify-center w-full h-full p-6 text-center">
        
        <div class="relative mb-8 group">
            <h1 class="text-9xl md:text-[12rem] font-bold tracking-tighter opacity-90 text-[#6b654b] mix-blend-difference select-none glitch-text" data-text={status}>
                {status}
            </h1>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-900/20 text-sm tracking-[1em] uppercase w-full animate-pulse">
                Reality Failure
            </div>
        </div>

        <div class="max-w-md bg-[#e6e1b8]/90 border border-[#b3ad85] p-6 shadow-xl backdrop-blur-sm rotate-1 transform transition-transform hover:rotate-0 duration-500">
            <div class="flex items-center gap-2 text-red-900/80 mb-4 border-b border-stone-400/30 pb-2">
                <AlertTriangle class="w-5 h-5" />
                <span class="text-xs font-bold tracking-widest uppercase">Sector Unstable</span>
            </div>
            
            <h2 class="text-2xl font-bold mb-2 text-stone-900 uppercase tracking-tight">{errorTitle}</h2>
            <p class="text-stone-700 mb-6 leading-relaxed font-medium">
                {errorDescription}
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href="/" variant="default" class="bg-stone-800 text-[#d4cd92] hover:bg-black border border-stone-600 font-bold tracking-wider">
                    <DoorOpen class="mr-2 h-4 w-4" /> NOCLIP HOME
                </Button>
                
                <Button on:click={toggleMute} variant="outline" class="border-stone-600 text-stone-800 hover:bg-stone-700/10 bg-transparent">
                    {#if isMuted}
                        <VolumeX class="h-4 w-4 mr-2" /> Enable Audio
                    {:else}
                        <Volume2 class="h-4 w-4 mr-2" /> Mute Hum
                    {/if}
                </Button>
            </div>
        </div>
    </div>

    <div class="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between text-stone-900/70 z-20 pointer-events-none text-xs md:text-sm font-bold tracking-widest">
        <div class="flex flex-col gap-1">
            <span class="animate-pulse text-red-700">● REC</span>
            <span>TAPE_004</span>
        </div>
        <div class="flex flex-col items-end gap-1">
            <span>{timestamp}</span>
            <span>BATTERY <span class="inline-block w-4 h-2 border border-current bg-current ml-1"></span></span>
        </div>
    </div>

    <div class="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 border border-stone-900/20 pointer-events-none z-0 opacity-50">
        <div class="absolute top-1/2 left-0 w-full h-[1px] bg-stone-900/20"></div>
        <div class="absolute left-1/2 top-0 h-full w-[1px] bg-stone-900/20"></div>
    </div>

    <audio 
        bind:this={audioElement} 
        src="/sounds/404.mp3" 
        loop 
        muted={isMuted}
        preload="auto"
        aria-hidden="true"
    ></audio>
</div>

<style>
    /* The "Mono-Yellow" Pattern */
    .wallpaper-pattern {
        background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 19px, #b8b288 20px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, #b8b288 20px);
        background-size: 40px 40px;
    }

    /* Fluorescent Flicker Animation */
    @keyframes flicker {
        0% { opacity: 0.1; }
        5% { opacity: 0.2; }
        10% { opacity: 0.1; }
        15% { opacity: 0.3; }
        20% { opacity: 0.1; }
        50% { opacity: 0.1; }
        55% { opacity: 0.25; }
        60% { opacity: 0.1; }
        100% { opacity: 0.1; }
    }
    .animate-flicker {
        animation: flicker 4s infinite alternate;
    }

    /* Glitch Text Effect */
    .glitch-text {
        position: relative;
    }
    .glitch-text::before,
    .glitch-text::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #d4cd92; /* Matches background to hide main text */
    }
    .glitch-text::before {
        left: 2px;
        text-shadow: -1px 0 #ff00c1;
        clip-path: inset(44% 0 61% 0);
        animation: glitch-anim 2.5s infinite linear alternate-reverse;
    }
    .glitch-text::after {
        left: -2px;
        text-shadow: -1px 0 #00fff9;
        clip-path: inset(20% 0 20% 0); /* Static clip for stability */
        animation: glitch-anim2 3s infinite linear alternate-reverse;
    }

    @keyframes glitch-anim {
        0% { clip-path: inset(20% 0 80% 0); }
        20% { clip-path: inset(60% 0 10% 0); }
        40% { clip-path: inset(40% 0 50% 0); }
        60% { clip-path: inset(80% 0 5% 0); }
        80% { clip-path: inset(10% 0 60% 0); }
        100% { clip-path: inset(30% 0 30% 0); }
    }
    @keyframes glitch-anim2 {
        0% { clip-path: inset(10% 0 60% 0); }
        20% { clip-path: inset(30% 0 20% 0); }
        40% { clip-path: inset(70% 0 10% 0); }
        60% { clip-path: inset(20% 0 50% 0); }
        80% { clip-path: inset(50% 0 30% 0); }
        100% { clip-path: inset(0% 0 80% 0); }
    }
</style>