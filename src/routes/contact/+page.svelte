<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Mail, Send, Linkedin, Github, MapPin, Bug, MessageSquare, Terminal, AlertCircle, CheckCircle2 } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	const FORM_ENDPOINT = 'https://formspree.io/f/mqaqrvwg';

	const yourEmail = 'math@mathdesigns.dev';
	const yourLinkedIn = 'https://www.linkedin.com/in/matheo-simeoni/';
	const yourGitHub = 'https://github.com/MathDesigns';
	const yourLocation = 'Wallonia, Belgium';

	let formStatus: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');
	let formMessage = $state('');
    let ticketId = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

	async function handleSubmit(event: Event) {
		formStatus = 'submitting';
		formMessage = '';
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		try {
			const response = await fetch(form.action, {
				method: form.method,
				body: data,
				headers: { Accept: 'application/json' }
			});
			if (response.ok) {
				formStatus = 'success';
				formMessage = `Ticket #${ticketId} created successfully. Awaiting response.`;
				form.reset();
			} else {
				const responseData = await response.json();
				if (Object.hasOwn(responseData, 'errors')) {
					formMessage = responseData['errors'].map((error: { message: string }) => error['message']).join(', ');
				} else {
					formMessage = 'Error: Submission failed. Check connection.';
				}
				formStatus = 'error';
			}
		} catch (error) {
			formMessage = 'Fatal Error: Network unreachable.';
			formStatus = 'error';
		} finally {
			if (formStatus !== 'success' && formStatus !== 'submitting') {
				setTimeout(() => { if (formStatus !== 'submitting') formStatus = 'idle'; }, 5000);
			}
		}
	}
</script>

<svelte:head>
	<title>New Ticket | MathDesigns</title>
	<meta name="description" content="Open a communication channel with MathDesigns." />
</svelte:head>

<div class="container mx-auto px-4 py-12 md:px-0 max-w-5xl font-mono">
    <div class="mb-12 border-b border-border pb-6">
        <div class="flex items-center gap-2 mb-2 text-primary">
            <Bug class="h-5 w-5" />
            <span class="text-sm font-bold uppercase tracking-widest">Issue Tracker</span>
        </div>
		<h1 class="text-3xl font-bold md:text-4xl mb-2">Submit New Ticket</h1>
		<p class="text-muted-foreground">
			Open a new communication thread. Please provide details below.
		</p>
	</div>

	<div class="grid gap-12 md:grid-cols-5">
        
        <div class="space-y-8 md:col-span-2 order-2 md:order-1">
			
            <div class="rounded-sm border border-border bg-card/30 p-6">
                <h3 class="text-sm font-bold uppercase text-muted-foreground mb-4">Assigned Agent</h3>
                <div class="flex items-center gap-4 mb-6">
                    <div class="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                        <Terminal class="h-6 w-6" />
                    </div>
                    <div>
                        <div class="font-bold">MathDesigns</div>
                        <div class="text-xs text-green-500 flex items-center gap-1">
                            <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span> Online
                        </div>
                    </div>
                </div>
                
                <div class="space-y-4 text-sm">
                    <a href="mailto:{yourEmail}" class="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                        <Mail class="h-4 w-4" />
                        <span class="truncate">{yourEmail}</span>
                    </a>
                    <div class="flex items-center gap-3 text-muted-foreground">
                        <MapPin class="h-4 w-4" />
                        <span>{yourLocation}</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 class="text-sm font-bold uppercase text-muted-foreground mb-4">External Resources</h3>
                <div class="flex gap-3">
                    <Button href={yourLinkedIn} target="_blank" variant="outline" class="flex-1 border-dashed">
                        <Linkedin class="h-4 w-4 mr-2" /> Profile
                    </Button>
                    <Button href={yourGitHub} target="_blank" variant="outline" class="flex-1 border-dashed">
                        <Github class="h-4 w-4 mr-2" /> Repos
                    </Button>
                </div>
			</div>
		</div>

        <div class="md:col-span-3 order-1 md:order-2">
			<form
				action={FORM_ENDPOINT}
				method="POST"
				class="space-y-6 bg-card/10 p-1"
				onsubmit={preventDefault(handleSubmit)}
			>
                <div class="flex gap-4 mb-6 text-xs text-muted-foreground font-mono border-b border-border/50 pb-2">
                    <span>Ticket ID: <span class="text-foreground">#{ticketId}</span></span>
                    <span>Priority: <span class="text-primary">Normal</span></span>
                    <span>Date: <span class="text-foreground">{new Date().toLocaleDateString()}</span></span>
                </div>

				<div class="grid gap-6 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="name" class="text-xs uppercase text-muted-foreground">Reporter Name</Label>
						<Input type="text" id="name" name="name" required placeholder="Enter identifier..." class="font-mono bg-background/50" />
					</div>
					<div class="space-y-2">
						<Label for="email" class="text-xs uppercase text-muted-foreground">Return Address (Email)</Label>
						<Input type="email" id="email" name="email" required placeholder="user@domain.com" class="font-mono bg-background/50" />
					</div>
				</div>
				
                <div class="space-y-2">
					<Label for="subject" class="text-xs uppercase text-muted-foreground">Subject Summary</Label>
					<Input type="text" id="subject" name="subject" placeholder="Brief description of inquiry..." class="font-mono bg-background/50" />
				</div>
				
                <div class="space-y-2">
					<Label for="message" class="text-xs uppercase text-muted-foreground">Detailed Description</Label>
					<Textarea id="message" name="message" rows={6} required placeholder="> Type your message here..." class="font-mono bg-background/50 min-h-[150px]" />
				</div>

                {#if formMessage}
					<div
						class="rounded-sm border p-3 text-xs font-mono flex items-center gap-2 {formStatus === 'success'
							? 'border-green-500/30 bg-green-500/10 text-green-500'
							: 'border-red-500/30 bg-red-500/10 text-red-500'}"
					>
                        {#if formStatus === 'success'}
                            <CheckCircle2 class="h-4 w-4" />
                        {:else}
                            <AlertCircle class="h-4 w-4" />
                        {/if}
						<span class="uppercase">[{formStatus === 'success' ? 'OK' : 'ERR'}]</span> {formMessage}
					</div>
				{/if}

				<div>
					<Button
						type="submit"
						class="w-full md:w-auto font-mono"
                        size="lg"
						disabled={formStatus === 'submitting'}
					>
						{#if formStatus === 'submitting'}
                            <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
							UPLOADING...
						{:else}
							<Send class="mr-2 h-4 w-4" /> SUBMIT TICKET
						{/if}
					</Button>
				</div>
			</form>
		</div>
	</div>
</div>