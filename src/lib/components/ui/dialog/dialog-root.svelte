<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
    import type { Snippet } from "svelte";

	type Props = DialogPrimitive.Props & {
		children?: Snippet;
		[key: string]: any
	};

	let { open = $bindable(undefined), onOpenChange = undefined, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Root bind:open onOpenChange={onOpenChange} {...rest}>
	{@render children?.()}
</DialogPrimitive.Root>