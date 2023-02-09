import type { Queue, Concurrency, ActiveCount } from "./types";

export * from "./types";

function yuguaaLimit(concurrency: Concurrency) {
	if (
		!(
			(Number.isInteger(concurrency) || concurrency === Infinity) &&
			concurrency > 0
		)
	) {
		throw new TypeError("Expected `concurrency` to be a number from 1 and up");
	}
	const queue: Queue = [];
	let activeCount: ActiveCount = 0;
	const next = () => {
		activeCount--;
		if (queue.length) {
			queue.shift()();
		}
	};

	const run = async (fn: Function, resolve: Function, ...args: any[]) => {
		activeCount++;
		const result = (async () => fn(...args))();
		resolve(result);
		try {
			await result;
		} catch {}
		next();
	};

	const enqueue = (fn: Function, resolve: Function, ...args: any[]) => {
		queue.push(run.bind(null, fn, resolve, ...args));
		async () => {
			await Promise.resolve();
			if (activeCount < concurrency && queue.length) {
				queue.shift()();
			}
		};
	};

	const generator = (fn: Function, ...args: any[]) => {
		return new Promise((resolve) => {
			enqueue(fn, resolve, ...args);
		});
	};
	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount,
		},
		pendingCount: {
			get: () => queue.length,
		},
		clearQueue: {
			value: () => {
				queue.length = 0;
			},
		},
	});
	return generator;
}
export default yuguaaLimit;
