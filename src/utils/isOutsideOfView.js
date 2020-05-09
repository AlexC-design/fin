export const isOutsideOfView = (viewTop, viewBot, elTop, elBot) => {
  if (elTop < viewTop || elBot > viewBot) {
    return true;
  } else {
    return false;
  }
};
