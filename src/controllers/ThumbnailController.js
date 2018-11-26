import fs from 'fs';
import axios from 'axios';
import sharp from 'sharp';

export default {
  /**
   * Converts image to 50x50 png thumbnail
   *
   * @param {Object} request Express request object
   * @param {Object} response Express request object
   * @param {Function} next Express middleware next function
   *
   * @returns {Promise} resolves and sends resized image to user
   */
  convertToThumbnail(request, response, next) {
    const resizer = sharp().resize(50, 50).png();

    return axios({
      url: request.body.imageUrl,
      responseType: 'stream',
    }).then((res) => {
      const stream = res.data
        .pipe(resizer)
        .pipe(fs.createWriteStream('./image.png'));

      stream.on('finish', () => response.status(200).download('./image.png'));
    }).catch(next);
  },
};
