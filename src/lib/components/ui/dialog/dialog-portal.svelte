<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	type Props = DialogPrimitive.PortalProps;
	let props: Props = $$props;
</script>

<DialogPrimitive.Portal {...props}>
	<slot />
</DialogPrimitive.Portal>