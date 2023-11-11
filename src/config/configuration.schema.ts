import * as Joi from 'joi';

export default Joi.object({
  OAUTH_SCOPES: Joi.string().required(),
  OAUTH_REDIRECT_URI: Joi.string().required(),
});
