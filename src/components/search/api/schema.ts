export const geoLocation = {
    'type': 'object',
    'properties': {
        'lng': { 'type': 'number' },
        'lat': { 'type': 'number' },
    },
    'required': ['lng', 'lat'],
};

export const serviceSearchItem = {
    'type': 'object',
    'properties': {
        'service_name': { 'type': 'string' },
        'service_description': { 'type': 'string' },
        'service_id': { 'type': 'string' },
        'street_address': { 'type': 'string' },
        'city': { 'type': 'string' },
        'postal_code': { 'type': 'string' },
        '_geoloc': geoLocation,
    },
    'required': ['service_name',
        'service_description',
        'service_id',
        'street_address',
        'city',
        'postal_code',
        '_geoloc',
    ],
};

export const serviceSearchItemArray = {
    'type': 'array',
    'items': serviceSearchItem,
};

export const organizationSearchItem = {
    'type': 'object',
    'properties': {
        'organization_id': { 'type': 'string' },
        'organization_name': { 'type': 'string' },
        'organization_description': { 'type': 'string' },
        'organization_website': { 'type': 'string' },
        'organization_email': { 'type': 'string' },
    },
    'required': ['organization_id',
        'organization_name',
        'organization_description',
        'organization_website',
        'organization_email',
    ],
};

export const organizationSearchItemArray = {
    'type': 'array',
    'items': organizationSearchItem,
};

export const geoCoderResponse = {
    'longt': { 'type': 'number' },
    'latt': { 'type': 'number' },
    'standard': { 'type': 'object' },
    'Dissemination_Area': { 'type': 'object' },
    'postal': { 'type': 'string' },
    'required': ['longt', 'latt'],
};
