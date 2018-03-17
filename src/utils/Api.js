import md5 from 'md5';
import axios from 'axios';

import { API_URL, PUBLIC_KEY, PRIVATE_KEY } from '../constants/Url';

class Api {
	handleResponse(response) {
		return response.data.data.results;
	}

	getRequest(segment, extraParams = {}) {
		const url = `${API_URL}/${segment}`;
		const ts = Date.now();
		const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

		const params = {
			ts,
			hash,
			apikey: PUBLIC_KEY,
			...extraParams
		};

		return axios.get(url, { params }).then(this.handleResponse);
	}

	getComic(comicID) {
		return this.getRequest(`public/comics/${comicID}`).then(response => response[0]);
	}

	getCharacters(offset = 0) {
		return this.getRequest('public/characters', { offset });
	}
}

export default Api;
