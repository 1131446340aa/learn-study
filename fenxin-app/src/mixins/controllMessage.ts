import { reactive } from 'vue';
let messageState = reactive({
	visible: false,
	message: ''
});
function changeVisible(message: string, duration: number) {
	if (!messageState.visible) {
		messageState.visible = true;
		messageState.message = message;
		setTimeout(() => {
			messageState.visible = false;
			messageState.message = '';
		}, duration);
	}
}
export default { messageState, changeVisible };
