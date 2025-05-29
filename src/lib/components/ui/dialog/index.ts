// src/lib/components/ui/dialog/index.ts
import { Dialog as DialogPrimitive } from "bits-ui";
import { flyAndScale } from "$lib/utils"; //

import Root from "./dialog-root.svelte";
import Content from "./dialog-content.svelte";
import Header from "./dialog-header.svelte";
import Title from "./dialog-title.svelte";
import Description from "./dialog-description.svelte"; // Should now be found
import Footer from "./dialog-footer.svelte";       // Should now be found
import Overlay from "./dialog-overlay.svelte";
import Portal from "./dialog-portal.svelte";
import Close from "./dialog-close.svelte";         // Should now be found
import Trigger from "./dialog-trigger.svelte";

const StyledRoot = Root; // Using our Root component
const StyledTrigger = Trigger;
const StyledPortal = Portal;
const StyledOverlay = Overlay;
const StyledContent = Content;
const StyledHeader = Header;
const StyledFooter = Footer;
const StyledTitle = Title;
const StyledDescription = Description;
const StyledClose = Close;

export {
	StyledRoot as Root,
	StyledTrigger as Trigger,
	StyledPortal as Portal,
	StyledOverlay as Overlay,
	StyledContent as Content,
	StyledHeader as Header,
	StyledFooter as Footer,
	StyledTitle as Title,
	StyledDescription as Description,
	StyledClose as Close,
	//
	flyAndScale,
};

// Removed: export type DialogEvents = DialogPrimitive.Events;
// If specific event types are needed later, they can be derived or imported
// directly if available under different names from DialogPrimitive.