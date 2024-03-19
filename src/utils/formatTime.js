export const formatDate = (timestamp) => {
    const newdate = new Date(timestamp);
  
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  
    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
      newdate
    );
  
    return formattedTime;
  };