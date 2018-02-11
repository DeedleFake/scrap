const Configstore = window.require('configstore')

export const configReducer = (reducer, name, initial) => {
	const config = new Configstore(name, initial)
	return (state = config.all, action) => {
		let [next, changed] = reducer(state, action)
		if (changed) {
			config.set(next)
		}
		return next
	}
}
