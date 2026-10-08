import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MessageSquareText,
  Pencil,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Star,
  Trash2,
  Truck,
} from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/currency';
import { useAuth } from '../context/AuthContext';
import {
  createProductReview,
  deleteProductReview,
  getProductReviews,
  updateProductReview,
} from '../services/api';

const emptyReview = { name: '', title: '', comment: '' };

function getReviewList(response) {
  let reviews = response;
  if (!Array.isArray(reviews)) {
    reviews = reviews?.reviews ?? reviews?.items ?? reviews?.data;
  }
  if (!Array.isArray(reviews)) {
    reviews = reviews?.reviews ?? reviews?.items ?? reviews?.data;
  }
  const list = Array.isArray(reviews) ? reviews : reviews?.reviews ?? reviews?.items;

  if (!Array.isArray(list)) {
    throw new Error('The server returned an invalid reviews response.');
  }

  return list.map(normalizeReview);
}

function normalizeReview(review) {
  const reviewer = review.user ?? review.author ?? {};
  return {
    ...review,
    id: review.id ?? review._id ?? review.reviewId,
    userId: review.userId ?? reviewer.id ?? reviewer._id,
    email: review.email ?? reviewer.email,
    name: review.name ?? review.userName ?? reviewer.name ?? reviewer.email ?? 'Customer',
    title: review.title ?? '',
    comment: review.comment ?? review.review ?? review.text ?? '',
    rating: Number(review.rating) || 0,
    createdAt: review.createdAt ?? review.created_at ?? review.date ?? '',
  };
}

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const {
    isWishlisted,
    toggleWishlist,
    isWishlistUpdating,
    wishlistError,
  } = useWishlist();
  const { user } = useAuth();
  const { product, loading, error } = useProduct(id);
  const [reviewForm, setReviewForm] = useState(emptyReview);
  const [rating, setRating] = useState(5);
  const [reviewError, setReviewError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewActionError, setReviewActionError] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    let ignore = false;
    setReviewsLoading(true);
    setReviewActionError('');

    getProductReviews(id)
      .then((response) => {
        const productReviews = getReviewList(response);
        if (!ignore) setReviews(productReviews);
      })
      .catch((requestError) => {
        if (!ignore) {
          setReviewActionError(requestError.message || 'Unable to load product reviews.');
        }
      })
      .finally(() => {
        if (!ignore) setReviewsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <div role="status" className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-600 dark:border-dark-border dark:bg-dark-surface dark:text-gray-300">
          Loading product...
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <section className="rounded-3xl bg-card-light px-6 py-12 text-center dark:bg-dark-surface sm:px-10">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product not found
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            This product may no longer be available.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-dark-bg transition hover:bg-accent/90"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Back to products
          </Link>
        </section>
      </main>
    );
  }

  const hasDiscount = product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const liked = isWishlisted(product.id);

  const handleReviewChange = (event) => {
    setReviewForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setReviewError('');
  };

  const reviewPayload = () => ({
    name: reviewForm.name.trim(),
    rating,
    title: reviewForm.title.trim(),
    comment: reviewForm.comment.trim(),
  });

  const reloadReviews = async () => {
    const response = await getProductReviews(id);
    setReviews(getReviewList(response));
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (reviewForm.name.trim().length < 2) {
      setReviewError('Please enter your name.');
      return;
    }
    if (reviewForm.comment.trim().length < 10) {
      setReviewError('Please write at least 10 characters about your experience.');
      return;
    }

    setReviewError('');
    setReviewActionError('');
    setIsSubmittingReview(true);

    const submit = async () => {
      try {
        const payload = reviewPayload();
        if (editingReviewId) {
          await updateProductReview(editingReviewId, payload);
        } else {
          await createProductReview(id, payload);
        }
        await reloadReviews();
        setReviewForm(emptyReview);
        setRating(5);
        setEditingReviewId(null);
      } catch (requestError) {
        setReviewActionError(requestError.message || 'Unable to submit your review.');
      } finally {
        setIsSubmittingReview(false);
      }
    };

    void submit();
  };

  const canManageReview = (review) => {
    if (!user) return false;
    return (
      review.ownedByCurrentUser === true ||
      (review.userId && user.id && String(review.userId) === String(user.id)) ||
      (review.email && user.email && review.email.toLowerCase() === user.email.toLowerCase())
    );
  };

  const handleEditReview = (review) => {
    setReviewForm({
      name: review.name,
      title: review.title,
      comment: review.comment,
    });
    setRating(review.rating);
    setEditingReviewId(review.id);
    setReviewError('');
    setReviewActionError('');
    document.getElementById('review-name')?.focus();
  };

  const handleDeleteReview = async (reviewId) => {
    setReviewActionError('');
    try {
      await deleteProductReview(reviewId);
      setReviews((current) => current.filter((review) => String(review.id) !== String(reviewId)));
      if (String(editingReviewId) === String(reviewId)) {
        setEditingReviewId(null);
        setReviewForm(emptyReview);
        setRating(5);
      }
    } catch (requestError) {
      setReviewActionError(requestError.message || 'Unable to delete your review.');
    }
  };

  const cancelReviewEdit = () => {
    setEditingReviewId(null);
    setReviewForm(emptyReview);
    setRating(5);
    setReviewError('');
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/products" className="transition-colors hover:text-brand dark:hover:text-accent">
          Products
        </Link>
        <span aria-hidden="true">/</span>
        <span className="truncate font-medium text-gray-800 dark:text-gray-200">{product.name}</span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-card-light p-5 dark:bg-dark-surface sm:p-8 lg:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-dark-elevated">
            <div className="aspect-square max-h-[520px] w-full">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {hasDiscount && (
              <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-dark-bg">
                {discountPercent}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              disabled={isWishlistUpdating(product.id)}
              aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={liked}
              className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105 dark:bg-dark-surface ${
                liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500 dark:text-gray-300'
              }`}
            >
              <Heart size={20} className={liked ? 'fill-red-500' : ''} aria-hidden="true" />
            </button>
          </div>

          {wishlistError && (
            <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-300">
              {wishlistError}
            </p>
          )}

          <div>
            <span className="inline-flex rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-dark-elevated dark:text-accent">
              {product.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-gray-800 dark:bg-dark-elevated dark:text-gray-200">
                <Star size={16} className="fill-accent text-accent" aria-hidden="true" />
                {product.rating}
              </span>
              <a href="#reviews" className="text-sm text-gray-600 underline-offset-4 hover:underline dark:text-gray-300">
                {product.reviews} customer ratings
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  {formatCurrency(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300">
              {product.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/70 p-3 dark:border-dark-border dark:bg-dark-elevated/70">
                <Truck size={19} className="shrink-0 text-brand dark:text-accent" aria-hidden="true" />
                <span className="text-sm text-gray-700 dark:text-gray-200">Reliable delivery</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/70 p-3 dark:border-dark-border dark:bg-dark-elevated/70">
                <ShieldCheck size={19} className="shrink-0 text-brand dark:text-accent" aria-hidden="true" />
                <span className="text-sm text-gray-700 dark:text-gray-200">Secure checkout</span>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => addToCart(product)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 font-semibold text-dark-bg shadow-sm transition hover:bg-accent/90"
              >
                <ShoppingCart size={19} aria-hidden="true" />
                Add to Cart
              </button>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3.5 font-semibold text-gray-700 transition hover:bg-white dark:border-dark-border dark:text-gray-200 dark:hover:bg-dark-elevated"
              >
                <ArrowLeft size={17} aria-hidden="true" />
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="mt-10 sm:mt-14" aria-labelledby="reviews-heading">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-accent">
              Customer feedback
            </p>
            <h2 id="reviews-heading" className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              Reviews for {product.name}
            </h2>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 dark:border-dark-border dark:bg-dark-surface">
            <Star size={18} className="fill-accent text-accent" aria-hidden="true" />
            <span className="font-bold text-gray-900 dark:text-white">{product.rating}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews} ratings)</span>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <form
            onSubmit={handleReviewSubmit}
            className="rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-dark-border dark:bg-dark-surface sm:p-6"
          >
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-dark-border">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
                <MessageSquareText size={19} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {editingReviewId ? 'Edit your review' : 'Write a review'}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">Share your product experience</p>
              </div>
            </div>

            <div className="mt-5">
              <span id="review-rating-label" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Your rating
              </span>
              <div role="group" aria-labelledby="review-rating-label" className="mt-2 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`${star} star${star === 1 ? '' : 's'}`}
                    aria-pressed={rating === star}
                    className="rounded p-1 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Star
                      size={23}
                      className={star <= rating ? 'fill-accent text-accent' : 'text-gray-300 dark:text-gray-600'}
                      aria-hidden="true"
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{rating} out of 5</span>
              </div>
            </div>

            <label htmlFor="review-name" className="mt-5 block text-sm font-medium text-gray-800 dark:text-gray-200">
              Your name
            </label>
            <input
              id="review-name"
              name="name"
              value={reviewForm.name}
              onChange={handleReviewChange}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/15 dark:border-dark-border dark:bg-dark-elevated dark:text-white dark:focus:border-accent dark:focus:ring-accent/15"
            />

            <label htmlFor="review-title" className="mt-4 block text-sm font-medium text-gray-800 dark:text-gray-200">
              Review title <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <input
              id="review-title"
              name="title"
              value={reviewForm.title}
              onChange={handleReviewChange}
              placeholder="Sum it up in a few words"
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/15 dark:border-dark-border dark:bg-dark-elevated dark:text-white dark:focus:border-accent dark:focus:ring-accent/15"
            />

            <label htmlFor="review-comment" className="mt-4 block text-sm font-medium text-gray-800 dark:text-gray-200">
              Your review
            </label>
            <textarea
              id="review-comment"
              name="comment"
              rows={4}
              value={reviewForm.comment}
              onChange={handleReviewChange}
              placeholder="What did you like or dislike?"
              className="mt-2 w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/15 dark:border-dark-border dark:bg-dark-elevated dark:text-white dark:focus:border-accent dark:focus:ring-accent/15"
            />

            {reviewError && (
              <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-300">
                {reviewError}
              </p>
            )}
            {reviewActionError && (
              <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-300">
                {reviewActionError}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmittingReview}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-dark-bg transition hover:bg-accent/90 disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmittingReview
                ? 'Saving review...'
                : editingReviewId
                  ? 'Save Changes'
                  : 'Submit Review'}
              {!isSubmittingReview && <ArrowRight size={17} aria-hidden="true" />}
            </button>
            {editingReviewId && (
              <button
                type="button"
                onClick={cancelReviewEdit}
                disabled={isSubmittingReview}
                className="mt-3 w-full rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 dark:border-dark-border dark:text-gray-200 dark:hover:bg-dark-elevated"
              >
                Cancel editing
              </button>
            )}
          </form>

          <div className="space-y-4">
            {reviewsLoading ? (
              <p role="status" className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-600 dark:border-dark-border dark:bg-dark-surface dark:text-gray-300">
                Loading reviews...
              </p>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <article
                  key={review.id ?? `${review.name}-${review.createdAt}`}
                  className="rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-dark-border dark:bg-dark-surface sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-light/50 font-semibold uppercase text-brand dark:bg-dark-elevated dark:text-accent">
                        {review.name.charAt(0)}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{review.name}</h3>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{review.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex" role="img" aria-label={`${review.rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={15}
                          className={star <= review.rating ? 'fill-accent text-accent' : 'text-gray-300 dark:text-gray-600'}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  {review.title && (
                    <h4 className="mt-4 font-semibold text-gray-900 dark:text-white">{review.title}</h4>
                  )}
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{review.comment}</p>
                  {canManageReview(review) && review.id && (
                    <div className="mt-4 flex gap-4 border-t border-gray-100 pt-3 dark:border-dark-border">
                      <button
                        type="button"
                        onClick={() => handleEditReview(review)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline dark:text-accent"
                      >
                        <Pencil size={15} aria-hidden="true" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(review.id)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline dark:text-red-400"
                      >
                        <Trash2 size={15} aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  )}
                </article>
              ))
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-card-light/70 p-6 text-center dark:border-dark-border dark:bg-dark-surface">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
                  <MessageSquareText size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                  {reviewActionError ? 'Reviews are unavailable right now' : 'Be the first to share your thoughts'}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {reviewActionError || 'Your review will appear here after you submit it.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
