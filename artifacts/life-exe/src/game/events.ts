import type { Choice, GameEvent, Stats } from './types';

const c = (label: string, hint: string, effects: Partial<Stats>, outcome: string, extra: Partial<Choice> = {}): Choice =>
  ({ label, hint, effects, outcome, ...extra });

export const EVENTS: GameEvent[] = [
  { id: 'bus', category: 'Transport', title: 'One seat. Four passengers.', description: 'The bus conductor says “enter, space dey.” The space appears to be a philosophical concept. You have somewhere to be.', choices: [
    c('Squeeze in. Become origami.', '₦300 · Energy −10 · Reputation +2', { cash: -300, energy: -10, reputation: 2 }, 'You arrive with one leg asleep and a new understanding of geometry.'),
    c('Walk. Free cardio, expensive sweat.', 'Energy −18 · Health +5', { energy: -18, health: 5 }, 'You save the fare. Your shirt now has its own weather system.'),
    c('Share a ride with a stranger.', '₦700 · Relationships +5', { cash: -700, relationships: 5 }, 'Your seatmate has three business ideas. One is almost legal. You exchange numbers.'),
  ]},
  { id: 'data', category: 'Digital survival', title: 'Your data has left the chat.', description: 'One video later, your data balance is 0.00 MB. The video was a goat standing on a chair. Worth it? Debatable.', choices: [
    c('Buy a small bundle.', '₦500 · Skills +5', { cash: -500, skills: 5 }, 'You watch a tutorial instead this time. The goat has taught you restraint.'),
    c('Borrow a friend’s hotspot.', 'Relationships −3 · Energy +5', { relationships: -3, energy: 5 }, 'They change the password to “GETYOUROWNDATA.” Friendship is a renewable resource.'),
    c('Go offline. Touch actual grass.', 'Health +7 · Energy +10', { health: 7, energy: 10 }, 'The outside world has excellent resolution. No buffering either.'),
  ]},
  { id: 'family', category: 'Family pressure', title: 'The family group is typing…', description: 'An auntie asks when you will become “serious.” Nobody defines serious, but apparently it comes with a spouse and a car.', choices: [
    c('Send a respectful life update.', 'Relationships +8 · Reputation +4', { relationships: 8, reputation: 4 }, 'Auntie replies with a prayer and six voice notes. You are loved, loudly.'),
    c('Announce a totally imaginary promotion.', 'Reputation −5 · Chaos +1', { reputation: -5 }, 'They want to celebrate at your expense. Your fictional salary cannot help.', { flag: 'big-talk', chaos: 1 }),
    c('Mute for eight hours. Choose peace.', 'Energy +12 · Relationships −2', { energy: 12, relationships: -2 }, 'Silence is golden. Especially when your phone stops vibrating off the table.'),
  ]},
  { id: 'food', category: 'Food', title: 'The last piece of chicken.', description: 'At a shared lunch, one piece remains. Everyone says “you take it.” Nobody means it.', choices: [
    c('Split it. A tiny peace treaty.', 'Health +8 · Relationships +7', { health: 8, relationships: 7 }, 'There is barely enough chicken, but an unreasonable amount of goodwill.'),
    c('Take it. They literally offered.', 'Health +15 · Relationships −6', { health: 15, relationships: -6 }, 'Delicious. The group chat is suddenly very quiet.', { chaos: 1 }),
    c('Buy another plate for everyone.', '₦900 · Relationships +12', { cash: -900, relationships: 12 }, 'You become the patron saint of extra stew.'),
  ]},
  { id: 'freelance', category: 'Side hustle', title: '“It’s just a small design.”', description: 'A shop owner wants a flyer. Also a logo. Also maybe a website. The budget has not experienced the same growth.', choices: [
    c('Set a scope. Get paid properly.', '₦2,200 · Energy −12 · Skills +8', { cash: 2200, energy: -12, skills: 8 }, 'Two revisions, one invoice. The sacred boundary holds.', { flag: 'client' }),
    c('Do everything for exposure.', 'Energy −22 · Skills +10 · Reputation +6', { energy: -22, skills: 10, reputation: 6 }, 'Exposure pays no rent, but your portfolio now has something besides your name.'),
    c('Send them to a talented friend.', 'Relationships +8 · Reputation +3', { relationships: 8, reputation: 3 }, 'Your friend owes you a favour. You wisely do not accept payment in “vibes.”'),
  ]},
  { id: 'power', category: 'Home', title: 'Light out. Deadline in.', description: 'The power goes just as you open your laptop. A generator outside starts its audition for loudest object on Earth.', choices: [
    c('Work at a charging café.', '₦800 · Skills +7 · Energy −6', { cash: -800, skills: 7, energy: -6 }, 'Your drink costs more than your lunch. The deadline, however, survives.'),
    c('Nap until the lights return.', 'Energy +25 · Health +5', { energy: 25, health: 5 }, 'You dream in fully charged battery icons.'),
    c('Help the neighbour fix a solar lamp.', 'Skills +8 · Relationships +6 · Energy −8', { skills: 8, relationships: 6, energy: -8 }, 'It works. The neighbour calls you “engineer” for the rest of the week.'),
  ]},
  { id: 'rent', category: 'Adulting', minDay: 7, title: 'Rent does not accept vibes.', description: 'Your landlord sends “gentle reminder” with enough full stops to qualify as a threat. Your share of the rent is due.', choices: [
    c('Pay your ₦2,000 share.', '₦2,000 · Reputation +6 · Energy +5', { cash: -2000, reputation: 6, energy: 5 }, 'Receipt secured. Your roof and dignity remain where you left them.'),
    c('Negotiate an extension politely.', 'Reputation −3 · Energy −8', { reputation: -3, energy: -8 }, 'You get a week. The full stops reduce from seven to three.'),
    c('Move in with a friend temporarily.', 'Relationships −8 · Energy −10', { relationships: -8, energy: -10 }, 'Their couch is short. Their list of house rules is not.', { flag: 'couch' }),
  ]},
  { id: 'hustle', category: 'Small business', title: 'A snack empire begins.', description: 'Someone suggests selling chin chin at a weekend gathering. You have a recipe, a table, and disproportionate ambition.', choices: [
    c('Invest in a small batch.', '₦1,200 upfront · Skills +8 · Chance of profit', { cash: -1200, skills: 8, energy: -12 }, 'You sell out and earn ₦4,000. Someone asks for your “head office.” It is the kitchen.', { flag: 'business', risk: { chance: .3, effects: { cash: 500 }, outcome: 'Rain arrives before customers. You earn ₦500, eat the leftovers, and learn about risk.' } }),
    c('Help sell for a commission.', '₦1,300 · Energy −10 · Relationships +4', { cash: 1300, energy: -10, relationships: 4 }, 'You sell snacks with the confidence of someone who did not have to fry them.'),
    c('Sample extensively. For research.', 'Health +10 · Reputation −3', { health: 10, reputation: -3 }, 'Your report is one word: delicious. The owner bills you with a stare.', { chaos: 1 }),
  ]},
  { id: 'wedding', category: 'Social life', title: 'Wedding invite. Dress code: expensive.', description: 'A friend is getting married. The group’s matching fabric costs money that currently has other plans.', choices: [
    c('Wear something you already own.', 'Relationships +7 · Energy −8', { relationships: 7, energy: -8 }, 'Nobody remembers the outfit. Everyone remembers your spectacular dancing.'),
    c('Buy the fabric. Commit to the photos.', '₦1,500 · Reputation +10 · Relationships +5', { cash: -1500, reputation: 10, relationships: 5 }, 'You look like money. You now have less of it.'),
    c('Send a heartfelt message instead.', 'Energy +10 · Relationships +2', { energy: 10, relationships: 2 }, 'You skip the traffic, not the friendship. A photo of the cake finds you anyway.'),
  ]},
  { id: 'interview', category: 'Opportunity', title: 'Tell us about yourself.', description: 'An interview begins. You consider saying “tired.” Instead, a professional answer must be assembled immediately.', choices: [
    c('Show your actual work.', 'Skills 10 needed · ₦3,500 · Reputation +8', { cash: 3500, reputation: 8, energy: -10 }, 'Your skills do the talking. They offer a paid trial, not a motivational speech.', { requires: { stat: 'skills', min: 10 } }),
    c('Be honest about what you can learn.', 'Skills +7 · Reputation +4', { skills: 7, reputation: 4, energy: -5 }, 'No job yet, but useful feedback and an invitation to try again.'),
    c('Claim you can do literally anything.', 'Reputation −8 · Chaos +2', { reputation: -8, energy: -10 }, 'They ask you to demonstrate. The silence has a job, unlike you.', { flag: 'big-talk', chaos: 2 }),
  ]},
  { id: 'loan', category: 'Money', title: '“I’ll pay you on Friday.”', description: 'A friend asks to borrow ₦1,000. They do not specify which Friday. Time is a social construct, apparently.', choices: [
    c('Lend it, with a clear repayment date.', '₦1,000 · Relationships +8 · May be repaid', { cash: -1000, relationships: 8 }, 'They promise next Friday specifically. Progress.', { flag: 'loan' }),
    c('Offer help finding a small gig.', 'Relationships +5 · Skills +3', { relationships: 5, skills: 3 }, 'You help rewrite their advert. They get a customer and keep their dignity.'),
    c('Say no kindly. Your budget matters.', 'Energy +8 · Relationships −2', { energy: 8, relationships: -2 }, 'A boundary is not a betrayal. You repeat this while staring at the typing indicator.'),
  ]},
  { id: 'viral', category: 'Internet', title: 'Main character, accidentally.', description: 'A clip of you arguing with a faulty vending machine is circulating. The machine was wrong. The internet does not care.', choices: [
    c('Lean in. Post a dramatic sequel.', 'Reputation −12 · ₦1,000 · Chaos +2', { reputation: -12, cash: 1000 }, 'A parody account sponsors your next argument. A career path nobody recommended.', { flag: 'viral', chaos: 2 }),
    c('Laugh at yourself and move on.', 'Reputation +5 · Energy +8', { reputation: 5, energy: 8 }, 'Your caption wins people over. The machine remains unaccountable.'),
    c('Delete the apps for a day.', 'Health +8 · Energy +15', { health: 8, energy: 15 }, 'There is life beyond comments. It has fewer strangers assessing your trousers.'),
  ]},
  { id: 'course', category: 'Self improvement', title: 'Learn a skill. Not a buzzword.', description: 'A local workshop teaches practical bookkeeping. The poster has five fonts, but the teacher seems competent.', choices: [
    c('Pay for the workshop.', '₦800 · Skills +15 · Energy −8', { cash: -800, skills: 15, energy: -8 }, 'You can now calculate profit instead of declaring “business is moving.”'),
    c('Study free notes at home.', 'Skills +8 · Energy −12', { skills: 8, energy: -12 }, 'Free resources, expensive concentration. You actually finish a chapter.'),
    c('Teach a friend something you know.', 'Skills +4 · Relationships +8', { skills: 4, relationships: 8 }, 'Explaining it reveals three things you did not understand. Everyone learns.'),
  ]},
  { id: 'rest', category: 'Wellbeing', title: 'Your body has opened a support ticket.', description: 'Your back hurts, your eyes twitch, and even your phone tells you to rest. That is rich coming from your phone.', choices: [
    c('Take a proper recovery day.', 'Energy +35 · Health +20', { energy: 35, health: 20 }, 'You sleep, stretch, and eat. Being a person is surprisingly high maintenance.'),
    c('Push through a quick paid task.', '₦1,800 · Energy −20 · Health −12', { cash: 1800, energy: -20, health: -12 }, 'The money lands. Your body marks the support ticket as unresolved.'),
    c('Take a walk with a friend.', 'Health +12 · Energy +15 · Relationships +5', { health: 12, energy: 15, relationships: 5 }, 'You complain for thirty minutes. It counts as both cardio and therapy.'),
  ]},
  { id: 'parcel', category: 'Neighbourhood', title: 'Delivery detective.', description: 'Your neighbour’s package is at the wrong gate. The courier says “I am outside” as if there is only one outside.', choices: [
    c('Help track it down.', 'Relationships +10 · Energy −10', { relationships: 10, energy: -10 }, 'You solve it with landmarks and patience. The landmark is a suspiciously specific mango tree.'),
    c('Charge a small retrieval fee.', '₦700 · Energy −8 · Reputation +2', { cash: 700, energy: -8, reputation: 2 }, 'You are not nosy. You are a logistics consultant.'),
    c('Stay out of it and read a book.', 'Skills +5 · Energy +8', { skills: 5, energy: 8 }, 'Someone else finds the gate. You find a chapter without interruptions.'),
  ]},
  { id: 'market', category: 'Food', title: 'The price is “for you only.”', description: 'The market seller assures you this is a special price. The person before you received the same special treatment.', choices: [
    c('Bargain respectfully.', '₦400 · Health +12 · Skills +3', { cash: -400, health: 12, skills: 3 }, 'You win a small discount and a complimentary lecture on wholesale prices.'),
    c('Pay asking price. Avoid the debate.', '₦700 · Health +15 · Energy +5', { cash: -700, health: 15, energy: 5 }, 'Lunch is good. You buy fifteen minutes of peace along with the tomatoes.'),
    c('Cook with what is already home.', 'Health +6 · Skills +4 · Energy −5', { health: 6, skills: 4, energy: -5 }, 'A strange but edible invention. You will not be publishing the recipe.'),
  ]},
  { id: 'scheme', category: 'Suspicious opportunity', title: 'Double your money. Triple your concern.', description: 'Someone in a shiny shirt promises guaranteed returns. Their proof is a screenshot, three fire stickers, and urgency.', choices: [
    c('Risk ₦1,000 on the scheme.', '₦1,000 stake · Very risky · Chaos +2', { cash: -1000 }, 'An early payout of ₦2,500 arrives. This does not make it a good idea.', { chaos: 2, risk: { chance: .8, effects: {}, outcome: 'The group disappears. The shiny shirt was the only guaranteed return.' } }),
    c('Ask uncomfortable questions.', 'Skills +6 · Reputation +5', { skills: 6, reputation: 5 }, 'Their business model appears to be “please stop asking.”'),
    c('Warn your friends and leave.', 'Relationships +6 · Reputation +4', { relationships: 6, reputation: 4 }, 'You save someone’s savings. Your reward is a very sincere voice note.'),
  ]},
  { id: 'party', category: 'Social life', title: 'Just one small hangout.', description: 'Your friends promise you will be home by nine. The speaker system suggests a very different schedule.', choices: [
    c('Stay until the last song.', '₦600 · Energy −20 · Relationships +12', { cash: -600, energy: -20, relationships: 12 }, 'You dance like tomorrow has been cancelled. Tomorrow disagrees.', { chaos: 1 }),
    c('Pop in, then leave on time.', 'Relationships +6 · Energy −5', { relationships: 6, energy: -5 }, 'A rare achievement: you socialise and still meet your pillow before midnight.'),
    c('Stay home. Recharge yourself.', 'Energy +25 · Health +8', { energy: 25, health: 8 }, 'Your outfit is comfortable and your guest list is zero. Excellent event planning.'),
  ]},
  { id: 'repair', category: 'Practical skills', title: 'Your phone has developed character.', description: 'The screen only works if you hold it at an angle that qualifies as yoga. A repair stall beckons.', choices: [
    c('Pay a proper repairer.', '₦1,000 · Energy +10', { cash: -1000, energy: 10 }, 'The phone works. The repairer calls you “boss.” A fair exchange.'),
    c('Try fixing it with a tutorial.', 'Skills +10 · Risk of ₦600 damage', { skills: 10, energy: -10 }, 'A loose cable clicks back in. You feel briefly invincible.', { risk: { chance: .35, effects: { cash: -600, reputation: -2 }, outcome: 'You improve your skills and worsen your phone. Learning has a service charge.' } }),
    c('Use the awkward angle for now.', 'Energy −5 · Health −3', { energy: -5, health: -3 }, 'Your thumb adapts. Your wrist files a formal complaint.'),
  ]},
  { id: 'community', category: 'Neighbourhood', title: 'The street needs a hand.', description: 'Neighbours organise a cleanup. Someone brought gloves; someone else brought a speech. You can guess who works harder.', choices: [
    c('Volunteer and actually work.', 'Reputation +10 · Relationships +8 · Energy −15', { reputation: 10, relationships: 8, energy: -15 }, 'The street looks better. You meet people who can lend tools, not just opinions.'),
    c('Donate supplies.', '₦700 · Reputation +8 · Relationships +4', { cash: -700, reputation: 8, relationships: 4 }, 'Your contribution is practical. The speech person thanks you for twenty minutes.'),
    c('Make a dramatic speech instead.', 'Reputation −5 · Chaos +1', { reputation: -5 }, 'Your speech contains “synergy.” Someone silently hands you a broom.', { chaos: 1 }),
  ]},
  { id: 'gig', category: 'Opportunity', title: 'Weekend work, weekday money.', description: 'An event planner needs someone reliable to help with setup. “Reliable” mostly means actually showing up.', choices: [
    c('Take the setup gig.', '₦2,800 · Energy −18 · Reputation +6', { cash: 2800, energy: -18, reputation: 6 }, 'You arrive early, solve problems, and get paid. A deeply underrated plot twist.'),
    c('Recommend a friend and assist briefly.', '₦900 · Relationships +8 · Energy −6', { cash: 900, relationships: 8, energy: -6 }, 'They get the gig; you get a referral fee. Everyone except your alarm clock wins.'),
    c('Protect your weekend.', 'Health +10 · Energy +20', { health: 10, energy: 20 }, 'You are unavailable, not unambitious. Your laundry is finally available to wear.'),
  ]},
  { id: 'crush', category: 'Relationships', title: '“So, what are we?”', description: 'Someone you like asks a deceptively short question. Your heart begins loading an answer on a very slow connection.', choices: [
    c('Be clear and honest.', 'Relationships +12 · Reputation +4', { relationships: 12, reputation: 4 }, 'A real conversation replaces six weeks of interpreting punctuation.'),
    c('Plan a simple thoughtful date.', '₦800 · Relationships +15 · Energy +5', { cash: -800, relationships: 15, energy: 5 }, 'A walk and good snacks. Romance does not need a financial audit.'),
    c('Reply “lol” and disappear.', 'Relationships −12 · Reputation −6 · Chaos +1', { relationships: -12, reputation: -6 }, 'The ambiguity has been resolved. Not in your favour.', { chaos: 1 }),
  ]},
  { id: 'umbrella', category: 'Unexpected weather', title: 'The sky has other plans.', description: 'Rain begins exactly when you step outside. Your umbrella is at home, enjoying the dry weather.', choices: [
    c('Wait it out under a shop awning.', 'Energy +8 · Relationships +4', { energy: 8, relationships: 4 }, 'You chat with the shop owner. A delay becomes an unexpectedly nice afternoon.'),
    c('Buy a small umbrella.', '₦500 · Health +5', { cash: -500, health: 5 }, 'You now own three umbrellas in three inconvenient locations.'),
    c('Run through it like a film scene.', 'Health −10 · Energy −12 · Chaos +1', { health: -10, energy: -12 }, 'The soundtrack is beautiful. It is mostly your shoes squelching.', { chaos: 1 }),
  ]},
  { id: 'neighbour-noise', category: 'Home', title: 'Bass at 2 a.m.', description: 'Your neighbour discovers music has a volume setting called “everybody’s problem.” Tomorrow you need your brain.', choices: [
    c('Ask politely to turn it down.', 'Reputation +4 · Energy +15', { reputation: 4, energy: 15 }, 'They apologise. A calm sentence accomplishes what your imaginary argument could not.'),
    c('Start a louder playlist battle.', 'Energy −15 · Reputation −8 · Chaos +2', { energy: -15, reputation: -8 }, 'You both lose. The whole street now knows your questionable taste.', { chaos: 2 }),
    c('Sleep at a friend’s place.', 'Relationships +5 · Health +8 · Energy +10', { relationships: 5, health: 8, energy: 10 }, 'They lend you a pillow. You pay them back with breakfast duty.'),
  ]},
  { id: 'client-return', category: 'Consequence', needsFlag: 'client', title: 'The client remembers you.', description: 'That flyer client is back. This time they have a budget and a friend who needs work too. Boundaries have compound interest.', choices: [
    c('Take the bigger project.', '₦4,000 · Skills +10 · Energy −18', { cash: 4000, skills: 10, energy: -18 }, 'Your earlier professionalism turns into actual money. The logo is still not “just a small thing.”'),
    c('Split the job with a friend.', '₦2,000 · Relationships +10 · Skills +5', { cash: 2000, relationships: 10, skills: 5, energy: -8 }, 'Teamwork makes the deadline less terrifying. You both get paid.'),
    c('Decline because you need rest.', 'Energy +20 · Health +10', { energy: 20, health: 10 }, 'You leave on good terms. Saying no does not set your portfolio on fire.'),
  ]},
  { id: 'business-return', category: 'Consequence', needsFlag: 'business', title: 'Your kitchen gets a bulk order.', description: 'Someone tasted your snacks and wants a batch for an office party. Your empire has acquired its first spreadsheet.', choices: [
    c('Fulfil the order carefully.', 'Skills 8 needed · ₦4,500 · Energy −20', { cash: 4500, energy: -20, skills: 6, reputation: 8 }, 'A repeat customer is born. You start writing “founder” without irony.', { requires: { stat: 'skills', min: 8 } }),
    c('Partner with a better-equipped cook.', '₦2,000 · Relationships +8 · Reputation +5', { cash: 2000, relationships: 8, reputation: 5, energy: -8 }, 'Half the margin, half the stress, all the snacks delivered.'),
    c('Turn it down kindly.', 'Energy +15 · Health +5', { energy: 15, health: 5 }, 'You protect your capacity. The kitchen remains a kitchen for one more day.'),
  ]},
  { id: 'loan-return', category: 'Consequence', needsFlag: 'loan', title: 'Friday has finally arrived.', description: 'Your friend messages about that loan. Miraculously, the calendar has cooperated. They want to settle it.', choices: [
    c('Accept the repayment.', '₦1,000 · Relationships +6', { cash: 1000, relationships: 6 }, 'Money returns and trust survives. A rare double win.'),
    c('Accept half and forgive the rest.', '₦500 · Relationships +12 · Reputation +4', { cash: 500, relationships: 12, reputation: 4 }, 'Generous, but only because you chose it. Your friend remembers.'),
    c('Ask them to teach you their new skill instead.', 'Skills +12 · Relationships +7', { skills: 12, relationships: 7 }, 'An afternoon lesson pays a different kind of dividend.'),
  ]},
  { id: 'viral-return', category: 'Consequence', needsFlag: 'viral', title: 'The internet wants an encore.', description: 'A local shop offers cash for another ridiculous clip. Your reputation has become a very strange business asset.', choices: [
    c('Make a harmless silly advert.', '₦3,000 · Reputation −5 · Chaos +1', { cash: 3000, reputation: -5, energy: -10 }, 'You argue with a blender. The blender wins. The invoice clears.', { chaos: 1 }),
    c('Use the attention to promote useful work.', 'Skills +7 · Reputation +12', { skills: 7, reputation: 12, energy: -5 }, 'Some followers leave. The ones who stay might actually hire you.'),
    c('Retire from public appliance disputes.', 'Health +10 · Energy +20', { health: 10, energy: 20 }, 'You reclaim your peace. Household objects breathe a sigh of relief.'),
  ]},
  { id: 'big-talk-return', category: 'Consequence', needsFlag: 'big-talk', title: 'Your story needs receipts.', description: 'Someone remembers your very impressive claim. They now ask for proof. Your past self has scheduled a meeting with reality.', choices: [
    c('Admit you exaggerated. Start again.', 'Reputation +8 · Relationships +4', { reputation: 8, relationships: 4 }, 'An awkward apology costs less than maintaining a fictional career.'),
    c('Actually learn the thing.', 'Skills +12 · Energy −15 · Reputation +3', { skills: 12, energy: -15, reputation: 3 }, 'For once, panic produces competence. Your claim is slightly less fictional.'),
    c('Invent an even bigger story.', 'Reputation −15 · Relationships −8 · Chaos +2', { reputation: -15, relationships: -8 }, 'Your web of lies now requires project management software.', { chaos: 2 }),
  ]},
  { id: 'couch-return', category: 'Consequence', needsFlag: 'couch', title: 'The couch has terms and conditions.', description: 'Your friend has been patient, but the living room is not a permanent address. It is time for a plan.', choices: [
    c('Contribute to the household.', '₦1,000 · Relationships +12 · Reputation +5', { cash: -1000, relationships: 12, reputation: 5 }, 'Buying groceries is more persuasive than promising “soon.”'),
    c('Help with chores and agree on a move-out date.', 'Relationships +8 · Energy −12 · Skills +3', { relationships: 8, energy: -12, skills: 3 }, 'A clear plan reduces tension. You also discover the mop has a correct end.'),
    c('Pretend you did not hear.', 'Relationships −15 · Reputation −10 · Chaos +1', { relationships: -15, reputation: -10 }, 'The couch is comfortable. The silence in the room is not.', { chaos: 1 }),
  ]},
];
