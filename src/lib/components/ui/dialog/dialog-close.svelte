<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	// Correctly import the Button component and its Props type (aliased as ButtonProps)
	import { Button, type ButtonProps } from "$lib/components/ui/button"; //
	import { cn } from "$lib/utils"; //
	import X from "lucide-svelte/icons/x";

	// Use the imported ButtonProps type
	type Props = DialogPrimitive.CloseProps & ButtonProps;
	type Events = DialogPrimitive.CloseEvents;

	export let asChild: Props["asChild"] = false;
	// Removed: let props: Props = $$props; (not needed if we spread $$restProps or pass specific props)
	let className: Props["class"] = undefined;
	export { className as class };

	// Filter out non-DialogPrimitive.CloseProps before spreading to DialogPrimitive.Close
	// This is a bit more robust to avoid passing Button-specific props to the bits-ui component
	// However, for simplicity with `asChild`, bits-ui often handles prop spreading gracefully.
	// For now, we'll keep it simple as bits-ui's asChild usually manages this.
</script>

<DialogPrimitive.Close
	{asChild}
	class={cn(
		"absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	{#if asChild}
		<slot />
	{:else}
		<X class="h-4 w-4" />
		<span class="sr-only">Close</span>
	{/if}
</DialogPrimitive.Close>