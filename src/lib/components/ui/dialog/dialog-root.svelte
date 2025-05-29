<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	type Props = DialogPrimitive.Props;
	export let open: Props["open"] = undefined;
	export let onOpenChange: Props["onOpenChange"] = undefined;
	// Add other props as needed from DialogPrimitive.Props
</script>

<DialogPrimitive.Root bind:open onOpenChange={onOpenChange} {...$$restProps}>
	<slot />
</DialogPrimitive.Root>