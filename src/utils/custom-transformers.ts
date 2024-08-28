import { Transform } from 'class-transformer';

export function TrimTransformer() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    return value.trim();
  });
}

export function DateTransformer() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    return new Date(value);
  });
}

export function LowerCaseTransformer() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    return value.toLowerCase();
  });
}

export function UpperCaseTransformer() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    return value.toUpperCase();
  });
}

export function RemoveSpacesTransformer() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    return value.replace(/\s/g, '');
  });
}
