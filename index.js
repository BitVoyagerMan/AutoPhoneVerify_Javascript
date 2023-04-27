const { SMSActivate, SMSNumber } = require('sms-activate-org');

const client = new SMSActivate(process.env.API_KEY); 
async function getNumber() {
  try {
    const { id, number } = await client.getNumber('gn'); // 'gn' for Google
    return { phone: number, activationId: id };
  } catch (error) {
    console.error('Error getting number:', error);
  }
}

async function getStatus(activationId) {
  try {
    const { code } = await client.getStatus(activationId);
    return code;
  } catch (error) {
    console.error('Error getting status:', error);
  }
}

async function getBumbleVerificationCode() {
  const { phone, activationId } = await getNumber();
  console.log('Virtual number:', phone);

  // Add your logic here to request a Bumble verification code
  // using the obtained virtual number (phone)

  setTimeout(async () => {
    const code = await getStatus(activationId);
    if (code) {
      console.log('Bumble verification code:', code);
    }
  }, 30000); // Wait 30 seconds to give Bumble time to send the verification code
}

getBumbleVerificationCode();