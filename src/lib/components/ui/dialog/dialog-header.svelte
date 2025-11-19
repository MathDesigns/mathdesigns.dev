<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
    import type { Snippet } from "svelte";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	interface Props extends $$Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<div class={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...rest}>
	{@render children?.()}
</div>