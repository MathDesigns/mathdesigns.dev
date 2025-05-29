<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { flyAndScale } from "$lib/utils"; // Re-enable for transition
	import { cn } from "$lib/utils"; //
	import DialogOverlay from "./dialog-overlay.svelte";
	import DialogPortal from "./dialog-portal.svelte";
	import X from "lucide-svelte/icons/x";

	type Props = DialogPrimitive.ContentProps;
	let classNameFromProp: Props["class"] = undefined;
	export { classNameFromProp as class }; // Allow class prop from parent

	export let transition: DialogPrimitive.Transition = flyAndScale; // Re-enable transition
	export let transitionConfig: DialogPrimitive.TransitionConfig = { // Re-enable transition config
		duration: 250, // Slightly adjusted duration
		y: -30,        // Fly from a bit higher
		start: 0.96,   // Start slightly smaller
		opacity: 0     // Ensure it fades in
	};
</script>

<DialogPortal>
	<DialogOverlay />
	<DialogPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(
			"fixed left-[50%] top-[40%] md:top-[50%]",  // Position: slight offset from top on mobile
			"translate-x-[-50%] translate-y-[-50%]",    // Centering
			"z-[51]", // Content on top of overlay (z-50)
			"w-[95vw] sm:w-[90vw] max-w-xl",              // Sizing, responsive
			"bg-background border border-border",        // Theme-aware background and border
			"shadow-2xl rounded-lg",                  // Shadow and rounding
			// "p-0" will be applied from CommandPalette.svelte via classNameFromProp
			// "flex flex-col" etc. will also be applied from CommandPalette.svelte
			"focus-visible:ring-0 focus-visible:outline-none", // Remove default focus ring if you handle it internally
			classNameFromProp // Classes passed from CommandPalette.svelte
		)}
		{...$$restProps}
		>
		<slot />
		<DialogPrimitive.Close
			class="absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
</DialogPortal>