# $n\cdot \log(n)$ Comparison Sort

This page is the implementation of a thought experiment. In a standard merge sort, the time complexity is $O(n \cdot \log_2(n))$ because the comparison is binary: "is $a < b$?" but humans are capable of more complex comparisons.

I thought about doing "choose the best from $k$" as a comparison point, and this should give a time complexity of $O(n \cdot \log_k(n))$.

This can be calculated from the "sorting numbers" which are given by the sequence:

$$
A(n) = A\bigl(\lfloor n/2\rfloor\bigr) + A\bigl(\lceil n/2\rceil\bigr) + n - 1
$$

or the equation:

$$
n\lceil\log_2 n\rceil - 2^{\lceil\log_2 n\rceil} + 1
$$

notably the $2$s in this are the points of comparison and splitting, so swapping these out for $k$ gives:

$$
A_k(n) = A_k\bigl(\lfloor n/k\rfloor\bigr) + A_k\bigl(\lceil n/k\rceil\bigr) + n - 1\\
n\lceil\log_k n\rceil - k^{\lceil\log_k n\rceil} + 1
$$

At least that would be the hope.

Let's do the actual calculations for some fixe $k$.

We'll work by induction. Staring with the case when $n\leq k$:

The sorter can manually sort this in $n-1$ comparisons, so $A_k(n) = n-1$.

Now let's build the recurrence relation for $A_k(n)$:

We're splitting the list into k parts, and then sorting each part (in a recurtion step) before coming back to the main list comparing each of these in turn.

If we have $k-$many sorted lists, then to merge them will take $n-1$ comparisons (as we will have to specify the order of each element except the last) in the worst case and $n-\lceil n/k \rceil$ in the best (as we specify the order of every element except the largest pile.).

Example: if we have $4$ piles of size $16$ and $2$ piles of size $17$ ($n=98$, $k=6$) we may have to order $97$ of the elements (in the worst case -- where we have a single element left over) or we may only have to sort $91$ of them (in the best case -- when we have a pile of size $17$ left over).

<!-- Now, for the induction step, we assume that $A_k(n) = n\lceil\log_k n\rceil - k^{\lceil\log_k n\rceil} + 1$ for all $n\leq m$ and show that it holds for $m+1$. -->

Ok, but what happens when we have _unsorted_ piles?
Each sub-pile (of sime $m$) will take $A_k(m)$ comparisons to sort, but $m \in \{\lfloor n/k \rfloor, \lceil n/k \rceil \}$ and we need to know how many of each pile there is.

Define $m^k= \lceil m/k \rceil$, $m_k = \lfloor m/k \rfloor$ then we can simplify some notation, noting that $m^k -1= m_k$.

Intuitivly $m^k$ is the size of the largest pile and $m_k$ is the size of the smallest pile.

We have the residue: $r_k(m) = k\cdot m^k - m$. This is the count of the number of smaller piles.

In the above example

$$
\begin{align*}
r_k(m) &= k\cdot m^k-m\\
r_6(98) &=  6 \cdot \lceil m/k \rceil -98\\
r_6(98) &=  6 \cdot \lceil 98/6 \rceil -98\\
r_6(98) &=  6 \cdot (102/6) -98\\
r_6(98) &=  102-98\\
r_6(98) &= 4\\
\end{align*}
$$

So we have $r_k(m)$ piles of size $m_k$ and $r^k(m):=k-r_k(m)$ piles of size $m_k$.

explicitly:

$$
\begin{align*}
r^k &= k - r_k(m)\\
r^k &= k - (k\cdot m^k - m)\\
r^k &= k - k\cdot m^k + m\\
r^k &= m+ k - k\cdot m^k \\
r^k &= m+ k (1- m^k )\\
r^k &= m-k ( m^k-1 )\\
r^k &= m-k ( m_k )\\
r^k &= m-k \cdot m_k\\
\end{align*}
$$

so there's a lovely symmetry:

$$
\begin{align*}
r_k &= m-k \cdot m^k\\
r^k &= m-k \cdot m_k\\
\end{align*}
$$

and $r_k$ is the number of piles of size $m_k$ and $r^k$ is the number of piles of size $m^k$.

Which explains why I chose that notation.

Defining $B_k(m)$ to be the number of steps required to merge the sorted piles, which we know from earlier to be in the range $\{m-m^k,m-1\}$.

We have:

$$
 A_k(n)=r^k A_k(m^k) +r_k A_k(m_k) + B_k(m)
$$

To be consistent with the $k=2$ case from above, we shall assume $B_k(m) = m-1$.

Here we can note the deviation from the assumed value, as we have these coefficients $r^k$ and $r_k$ which are $1$ in the $k=2$ case.
