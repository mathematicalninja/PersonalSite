---
slug: Maths/piOclock
link: '/content/Maths/piOclock'
title: Maths Constants as times.
blurb: "I often found myself thinking 3:14:15 is no actually pi, it looks like pi, sure, but that's base 10. Times are base 60. So I went into this a little bit."
---

I often found myself thinking 3:14:15 is no actually pi, it looks like pi, sure, but that's base 10. Times are base 60. So I went into this a little bit.

## Starting at $e$

Even though it's a less well know constant outside of the maths and science world, $e$ is actually an easier place to start. There are a bunch of different ways to define $e$, depending on exactly what you are trying to accomplish.

While the notation is a little scary to the uninitiated, I will go through it and explain what's going on and what it all means later.

$$
e = \sum_{n=0}^{\infty} \frac{1}{n!}
$$

So here we're taking the number 1, and then adding on smaller and smaller fractions until eventually (after infinity has come and gone) we get a constant answer.

The number $n!$ is just what you get when you multiply the first $n$ many integers together.

So if we want to calculate what "e O'clock" means, we can just use this definition, add up a bunch of terms and see what happens. How many terms? until adding more won't change the answer by even 1 second.

So let's have a look:

$$
e \approx \frac{1}{0!} + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \frac{1}{4!} + \frac{1}{5!} + \frac{1}{6!} + \frac{1}{7!} + \dots
$$

And I'be stopped here because $7! = 5040$ and there are only $3600$ seconds in an hour, so if we add on the next number (knowing that $8! = 40320$) we would change the answer by less than a tenth of a second, and it quickly gets smaller than that. This is related to why $e$ is such a nice constant.

But since we are working in base $60$, we can actually do these calculation rather elegantly. If we drop that pesky $7$ term, which is less than a second, so I'm ok with that.

$$
\begin{align*}
\frac{1}{0!} &= \frac{1}{1} = &\text{1 hour}\\
\frac{1}{1!} &= \frac{1}{1} = &\text{1 hour}\\
\frac{1}{2!} &= \frac{1}{2} = &\text{half an hour}\\
\frac{1}{3!} &= \frac{1}{6} = &\text{10 minutes}\\
\frac{1}{4!} &= \frac{1}{24} = &\text{2 and a half minutes}\\
\frac{1}{5!} &= \frac{1}{120} = &\text{30 seconds}\\
\frac{1}{6!} &= \frac{1}{720} = &\text{5 seconds}\\
\end{align*}
$$

Adding this all up we get: $2$ hours $43$ minutes and $5$ seconds.

So the $e$ O'clock is $2:43:05$ which looks a bit different from the usual $e = 2.7182$, which you couldn't even write on a clock.

## $\pi$ O'clock

one of my favourite formulas for $\pi$ is:

$$
\frac{\pi}{4} = \sum_{k=0}^{\infty} \frac{(-1)^{k}}{2k + 1}
$$

Which again may look daunting, but is actually quite simple when you expand out all the tricky notation.

$$
\frac{\pi}{4}= 1-\frac{1}{3}+\frac{1}{5}-\frac{1}{7}+\frac{1}{9}-\cdots
$$

So we're just adding up the reciprocals of odd numbers and swapping the sign. Easy.

But the actual calculation takes a lot longer than $e$'s to get stable, as we need to be making sure we're within $\frac{1}{3600}$ of pi, so we'd need to add up terms until at least that to make sure we're close.

If we just add up until $\frac{1}{3600}$ we get 3.1410, which is close, but still off of the 3.1415 we wanted. And if you check how many calculations you need to do to get this accuracy...it's over a million.

So it's much quicker to simply convert the decimal into a time.

$$
\begin{align*}
\pi \approx 3.1415 = \frac{31,415}{10,000}
\end{align*}
$$

and if we can get this as a fraction over $3,600$ then we'll have how many seconds fit into $\pi$ hours.

$$

\begin{align*}
\pi &\approx  \frac{31,415}{10,000} \\
&= \frac{31,415}{10,000} \times \frac{3600}{3600}\\
&= \frac{31,415}{3600} \times \frac{3600}{10,000}\\
&= \frac{113094000}{3600} \times \frac{1}{10,000}\\
&= \frac{113094}{3600} \times \frac{1}{10} \text{ at this point we can discard the .4 seconds}\\
&= \frac{113090}{3600} \times \frac{1}{10}\\
&= \frac{11309}{3600} \\
&= 3+\frac{509}{3600} \\
&= 3+\frac{8*60+29}{3600} \\
&= 3+\frac{8*60}{60*60} +\frac{29}{3600} \\
&= 3\text{ hours } 8 \text{ minutes and } 29 \text{ seconds.}
\end{align*}
$$

So all this is to say that $3:14:15$ is not $\pi$ O'clock, but rather $3:08:29$ is.
