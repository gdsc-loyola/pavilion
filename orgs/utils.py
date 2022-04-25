import json
import jwt
import requests
from django.contrib.auth import authenticate

def jwt_decode_token(token):
    """
    decodes token from request headers
    """
    domain = 'dev-i0r0l2o0.us.auth0.com'
    api_identifier = 'http://pavilion/api'
    header = jwt.get_unverified_header(token)
    jwks = requests.get(f'https://{domain}/.well-known/jwks.json').json()
    public_key = None
    for jwk in jwks['keys']:
        if jwk['kid'] == header['kid']:
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

    if public_key is None:
        raise Exception('Public key not found.')

    issuer = f'https://{domain}/'
    return jwt.decode(
        token,
        public_key,
        audience=api_identifier,
        issuer=issuer,
        algorithms=['RS256']
    )

def jwt_get_username_from_payload_handler(payload):
    """
    gets called in order to authorize auth0 logins into django
    """
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username
