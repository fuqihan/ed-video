<template>
  <div>
    <div id="paypal-button" ref="paypalButton" style="height: 200px;width: 200px"></div>
    <img src="http://edvideo-1252875234.cosbj.myqcloud.com/images/person/6ba7c817f7404c6cea2db49346f5e38.blob" alt="">
  </div>
</template>

<script>
  export default {
    mounted() {
      paypal.Button.render({

        env: 'sandbox', // Or 'sandbox'

        client: {
          sandbox: 'Ab3wgsEfwHsnSomtzyijTLIBQUTaQEpmuXM0-7ImdUidycQoWeFzCwI8RJpprIt12NsppaHtywRvDFOD',
          production: 'fuuqihan-facilitator@gmail.com'
        },

        commit: true, // Show a 'Pay Now' button

        payment: function (data, actions) {
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: {total: '1.00', currency: 'USD'}
                }
              ]
            }
          });
        },

        onAuthorize: function (data, actions) {
          return actions.payment.execute().then(function (payment) {

            // The payment is complete!
            // You can now show a confirmation message to the customer
            console.log(payment)
          });
        }

      }, '#paypal-button');
    }
  }
</script>

<style lang="less">

</style>
