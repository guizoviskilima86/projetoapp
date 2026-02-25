const stripe = require('../config/stripe');
const User = require('../models/User');

const createCheckoutSession = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email, name: user.fullName });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      subscription_data: { trial_period_days: 3 },
      success_url: `${process.env.FRONTEND_URL}/dashboard?sub=success`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard?sub=cancelled`
    });

    return res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
};

const stripeWebhook = async (req, res, next) => {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const user = await User.findOne({ stripeCustomerId: session.customer });
      if (user) {
        user.subscriptionStatus = 'trialing';
        user.stripeSubscriptionId = session.subscription;
        await user.save();
      }
    }

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
      const subscription = event.data.object;
      const user = await User.findOne({ stripeSubscriptionId: subscription.id });
      if (user) {
        user.subscriptionStatus = subscription.status === 'active' ? 'active' : subscription.status === 'trialing' ? 'trialing' : 'inactive';
        await user.save();
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      const user = await User.findOne({ stripeSubscriptionId: subscription.id });
      if (user) {
        user.subscriptionStatus = 'inactive';
        await user.save();
      }
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCheckoutSession, stripeWebhook };
