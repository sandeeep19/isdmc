'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gemsApi, type GemSubmission } from '@/lib/api/gems';
import { useRouter } from 'next/navigation';

const submissionSchema = z.object({
  title: z.string().min(3).max(80),
  category: z.enum(['place', 'food', 'story', 'photo']),
  description: z.string().min(120).max(1200),
  how_to_find: z.string().min(80).max(600),
  neighbourhood: z.string().optional(),
  contributor_name: z.string().min(2).max(40),
  contributor_email: z.string().email(),
  contributor_profile: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).min(1).max(5),
});

type FormData = z.infer<typeof submissionSchema>;

export default function SubmitGemPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      tags: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const submission: GemSubmission = {
        ...data,
        coordinates: coordinates || undefined,
        contributor_profile: data.contributor_profile || undefined,
      };
      await gemsApi.submit(submission);
      router.push('/gems/submit/success');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedTags = watch('tags');

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-heading text-4xl font-bold text-primary mb-4">Share a Hidden Gem</h1>
      <p className="text-neutral-slate mb-8">
        Help others discover Varanasi&apos;s secrets. We&apos;ll review your submission within 48 hours.
      </p>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${s <= step ? 'bg-primary text-white' : 'bg-secondary text-neutral-slate'
                }`}
            >
              {s}
            </div>
            {s < 5 && (
              <div
                className={`flex-1 h-1 mx-2 ${s < step ? 'bg-primary' : 'bg-secondary'}`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Type & Title */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Category *</label>
              <select
                {...register('category')}
                className="input-field"
              >
                <option value="place">Place</option>
                <option value="food">Food</option>
                <option value="story">Story</option>
                <option value="photo">Photo</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-2">Title *</label>
              <input
                type="text"
                {...register('title')}
                className="input-field"
                placeholder="e.g., The Back-alley Lassi of Harishchandra"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-primary"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Neighbourhood/Area *</label>
              <input
                type="text"
                {...register('neighbourhood')}
                className="input-field"
                placeholder="e.g., Dashashwamedh, Assi Ghat"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">How to Find *</label>
              <textarea
                {...register('how_to_find')}
                rows={4}
                className="input-field"
                placeholder="Provide clear directions with landmarks..."
              />
              {errors.how_to_find && (
                <p className="text-red-500 text-sm mt-1">{errors.how_to_find.message}</p>
              )}
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-sm text-neutral-slate mb-2">
                Optional: Click on the map to set exact location
              </p>
              <div className="bg-white rounded h-64 flex items-center justify-center border-2 border-dashed">
                <p className="text-neutral-slate">Map will load here</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Photos (Optional)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="input-field"
              />
              <p className="text-sm text-neutral-slate mt-1">
                Up to 10 images, max 8MB each. JPG, PNG, or WebP.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-outline"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Story & Tags */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Tell the Story *</label>
              <textarea
                {...register('description')}
                rows={6}
                className="input-field"
                placeholder="Share what makes this place special..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-2">Tags (Select 1-5) *</label>
              <div className="flex flex-wrap gap-2">
                {['quiet', 'sunrise', 'locals-only', 'budget', 'historic', 'food', 'shopping'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const current = selectedTags || [];
                      if (current.includes(tag)) {
                        setValue('tags', current.filter((t) => t !== tag));
                      } else if (current.length < 5) {
                        setValue('tags', [...current, tag]);
                      }
                    }}
                    className={`px-4 py-2 rounded-lg ${selectedTags?.includes(tag)
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-neutral-ink'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {errors.tags && (
                <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-outline"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Contributor Info & Submit */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Your Name *</label>
              <input
                type="text"
                {...register('contributor_name')}
                className="input-field"
              />
              {errors.contributor_name && (
                <p className="text-red-500 text-sm mt-1">{errors.contributor_name.message}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-2">Your Email *</label>
              <input
                type="email"
                {...register('contributor_email')}
                className="input-field"
              />
              {errors.contributor_email && (
                <p className="text-red-500 text-sm mt-1">{errors.contributor_email.message}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-2">Profile Link (Optional)</label>
              <input
                type="url"
                {...register('contributor_profile')}
                className="input-field"
                placeholder="https://instagram.com/yourhandle"
              />
            </div>
            <div className="bg-secondary p-4 rounded-lg space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" required className="w-4 h-4" />
                <span className="text-sm">I own these photos or have permission to use them</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" required className="w-4 h-4" />
                <span className="text-sm">This submission does not put anyone at risk</span>
              </label>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="btn-outline"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Hidden Gem'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
