import axios from 'axios';
import md5 from 'md5';

export default class Api {
	static URL = 'http://gateway.marvel.com/v1';;
	static PUBLIC_KEY = '6a45b8e2563160c7f9affe38e6e864db';
	static PRIVATE_KEY = '57162587f00385143fe30faf8f9726068432a620';

	getRequest(segment, extraParams = {}) {
		const ts = Date.now();
		const hash = md5(ts + Api.PRIVATE_KEY + Api.PUBLIC_KEY);

		const params = {
			ts,
			hash,
			apikey: Api.PUBLIC_KEY,
			...extraParams
		};

		return axios.get(`${Api.URL}/${segment}`, params);
	}

	getCharacters(offset = 0) {
		return this.getRequest('public/characters', { offset }).then(result => {
			console.log(result);
			return result;
		});
	}
}
