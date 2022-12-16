const getStringWithoutConstantCase = (string) => {
  return string.toLowerCase().split('_').join(' ')
}

export { getStringWithoutConstantCase }
