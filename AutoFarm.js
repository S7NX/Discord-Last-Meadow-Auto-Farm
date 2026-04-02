delete window.$;
let wpRequire = webpackChunkdiscord_app.push([[Symbol()], {}, (r) => r]);
webpackChunkdiscord_app.pop();

let api;
const stores = Object.values(wpRequire.c);

if (!api) api = stores.find((x) => x?.exports?.Bo?.get)?.exports?.Bo;
if (!api) api = stores.find((x) => x?.exports?.tn?.get)?.exports?.tn;

if (!api) {
	console.error('Failed to initialize Discord API');
	throw new Error('Cannot access Discord API');
}

let isRunning = false;

/**
 * Send activity action with rate limit handling
 * @param {string} activityType - 'gathering', 'combat', or 'crafting'
 * @param {string} action - 'start' or 'complete'
 * @param {number} retryCount - Internal retry counter
 */
async function sendAction(activityType, action, retryCount = 0) {
	try {
		const url = `/gorilla/activity/${activityType}/${action}`;
		const res = await api.post({ url, body: {} });
		if (res.status === 429) {
			const retryAfter = (res.body?.retry_after || 0.5) * 1000;
			await new Promise((r) => setTimeout(r, retryAfter + Math.random() * 500));
			if (retryCount < 3) return sendAction(activityType, action, retryCount + 1);
		}
		return true;
	} catch (e) {
		if (e.status === 429) {
			const retryAfter = (e.body?.retry_after || 0.5) * 1000;
			await new Promise((r) => setTimeout(r, retryAfter + Math.random() * 500));
			if (retryCount < 3) return sendAction(activityType, action, retryCount + 1);
		}
		return false;
	}
}

/**
 * Start Auto-Farm: Adventure (150ms), Combat (180s cooldown), Crafting (120s cooldown)
 * Runs indefinitely until stopAutoFarm() is called
 */
async function startAutoFarm() {
	isRunning = true;
	const startTime = Date.now();

	let lastCombatTime = 0;
	let lastCraftingTime = 0;
	let adventureCycles = 0;
	let combatCycles = 0;
	let craftingCycles = 0;

	console.log('🤖 Auto-Farm Started! (Infinite mode - use stopAutoFarm() to stop)');

	while (isRunning) {
		const now = Date.now();

		// Adventure: continuous at 150ms intervals (Start → Complete)
		await sendAction('gathering', 'start');
		await sendAction('gathering', 'complete');
		adventureCycles++;

		// Combat: every 180 seconds (Start → Complete)
		if (now - lastCombatTime >= 180000) {
			await sendAction('combat', 'start');
			await sendAction('combat', 'complete');
			lastCombatTime = now;
			combatCycles++;
		}

		// Crafting: every 120 seconds (Start → Complete)
		if (now - lastCraftingTime >= 120000) {
			await sendAction('crafting', 'start');
			await sendAction('crafting', 'complete');
			lastCraftingTime = now;
			craftingCycles++;
		}

		await new Promise((r) => setTimeout(r, 150));

		// Progress every 30 adventure cycles
		if (adventureCycles % 30 === 0) {
			const elapsed = Math.floor((now - startTime) / 1000);
			console.log(`[${elapsed}s] Adventure: ${adventureCycles} | Combat: ${combatCycles} | Crafting: ${craftingCycles}`);
		}
	}

	const elapsed = Math.floor((Date.now() - startTime) / 1000);
	console.log(`✅ Auto-Farm Stopped! Adventure: ${adventureCycles} | Combat: ${combatCycles} | Crafting: ${craftingCycles} | Duration: ${elapsed}s`);
}

/**
 * Stop Auto-Farm
 */
function stopAutoFarm() {
	isRunning = false;
	console.log('⛔ Auto-Farm Stopped');
}

// Auto-run on paste
console.log('⚡ Starting Auto-Farm...');
startAutoFarm();

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { startAutoFarm, stopAutoFarm };
}
