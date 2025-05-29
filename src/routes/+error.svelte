<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import { Home } from 'lucide-svelte';
	import Typewriter from '$lib/components/Typewriter.svelte';

	
	const status = $page.status;
	const errorMessage = $page.error?.message;

	let errorTitle = 'An Error Occurred';
	let errorDescription = ['Something went wrong. Please try again later.'];

	if (status === 404) {
		errorTitle = 'Page Not Found';
		errorDescription = ["Praise the sun !", "I don’t want to set the world on fire…", "Do a barrel roll !", "Oh yes... Tarnished, are we ?", "It's super effective !", "Objection !", "Ah S**t, Here We Go Again.", "Wake The F**k Up, Samurai! We Have A City To Burn", "Hey, You, You're Finally Awake.", "The Cake Is A Lie", "It's Dangerous To Go Alone! Take This."];
	} else if (errorMessage) {
		errorDescription = [errorMessage];
	}

	
	let logoElement: HTMLImageElement;
	let containerElement: HTMLDivElement;
	let audioElement: HTMLAudioElement | null = null;

	let x = 50; 
	let y = 50; 
	let dx = 1.5; 
	let dy = 1.5; 
	let logoWidth = 150; 
	let logoHeight = 75; 

	const colors = [
		'#FF5733', 
		'#33FF57', 
		'#3357FF', 
		'#FF33A1', 
		'#F1C40F', 
		'#8E44AD', 
		'#1ABC9C'  
	];
	let currentColorIndex = 0;

	let animationFrameId: number;

	function updateLogoColorAndDimensions() {
		if (!logoElement) return;
		
		const currentWidth = logoElement.offsetWidth;
		const currentHeight = logoElement.offsetHeight;
		if (currentWidth > 0 && logoWidth !== currentWidth) logoWidth = currentWidth;
		if (currentHeight > 0 && logoHeight !== currentHeight) logoHeight = currentHeight;


		currentColorIndex = (currentColorIndex + 1) % colors.length;
		logoElement.style.filter = `
			drop-shadow(0 0 3px ${colors[currentColorIndex]}) 
			drop-shadow(0 0 6px ${colors[currentColorIndex]}) 
			brightness(1.1) contrast(1.05)
		`;
	}

	function animate() {
		if (!browser || !containerElement || !logoElement) {
			if (browser) animationFrameId = requestAnimationFrame(animate);
			return;
		}

		const containerWidth = containerElement.clientWidth;
		const containerHeight = containerElement.clientHeight;

		if (logoWidth === 150 && logoElement.offsetWidth > 0) logoWidth = logoElement.offsetWidth;
		if (logoHeight === 75 && logoElement.offsetHeight > 0) logoHeight = logoElement.offsetHeight;

		x += dx;
		y += dy;

		let hitEdge = false;

		if (x + logoWidth >= containerWidth) {
			x = containerWidth - logoWidth;
			dx *= -1;
			hitEdge = true;
		} else if (x <= 0) {
			x = 0;
			dx *= -1;
			hitEdge = true;
		}

		if (y + logoHeight >= containerHeight) {
			y = containerHeight - logoHeight;
			dy *= -1; 
			hitEdge = true;
		} else if (y <= 0) {
			y = 0;
			dy *= -1;
			hitEdge = true;
		}

		if (hitEdge) {
			updateLogoColorAndDimensions();
		}

		logoElement.style.left = `${x}px`;
		logoElement.style.top = `${y}px`;

		animationFrameId = requestAnimationFrame(animate);
	}

	onMount(() => {
		if (browser) {
			if (logoElement) {
				if (logoElement.complete) {
					logoWidth = logoElement.offsetWidth || logoWidth;
					logoHeight = logoElement.offsetHeight || logoHeight;
					updateLogoColorAndDimensions(); 
				} else {
					logoElement.onload = () => {
						logoWidth = logoElement.offsetWidth;
						logoHeight = logoElement.offsetHeight;
						updateLogoColorAndDimensions(); 
					};
				}
			} else {
                updateLogoColorAndDimensions(); 
            }
			animationFrameId = requestAnimationFrame(animate);
		}

		if (audioElement) {
				audioElement.volume = 0.05;
				audioElement.play().catch(error => {
					console.warn("Audio autoplay was prevented by the browser:", error);
				});
			}
	});

	onDestroy(() => {
		if (browser) {
			cancelAnimationFrame(animationFrameId);
		}
	});
</script>

<svelte:head>
	<title>{status} - {errorTitle}</title>
</svelte:head>

<div 
    bind:this={containerElement}
    class="fixed inset-0 w-screen h-screen bg-black overflow-hidden z-[999]"
    aria-label="Bouncing logo error screen"
>
	<img
		bind:this={logoElement}
		src="/logo.png" 
		alt="Site Logo - Bouncing"
		class="absolute"
		style="width: {logoWidth}px; height: auto; will-change: transform, filter; image-rendering: pixelated;"
		width="{logoWidth}" height="{logoHeight}"
	/>

	<div class="absolute inset-0 p-4 md:p-8 flex flex-col items-center justify-center text-center z-10 rounded-lg
                bg-black/30 ">
		<div class="bg-black/50 p-6 md:p-8 rounded-lg shadow-xl backdrop-blur-sm">
			<h1 class="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg">
				{status}: {errorTitle}
			</h1>
			<p class="text-md sm:text-lg md:text-xl lg:text-2xl text-neutral-200 mx-auto drop-shadow-md mb-6">
				<Typewriter texts={errorDescription} typingSpeed={45} deletingSpeed={25} delayBetweenTexts={1000} />
			</p>
			<Button href="/" variant="outline" class="border-white/50 text-white hover:bg-white/10 hover:text-white active:bg-white/20 transition-colors duration-150">
				<Home class="mr-2 h-4 w-4"/> Go Home
			</Button>
		</div>
	</div>
	<audio 
        bind:this={audioElement} 
        src="/sounds/404.mp3" 
        loop 
        autoplay 
        preload="auto"
        aria-hidden="true"
    ></audio>
</div>

<style>
	img.absolute {
		z-index: 5; 
	}
</style>
