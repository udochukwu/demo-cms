import React, { useState, ChangeEvent, useEffect } from 'react'
import Button from 'components/Button/Button'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiImageAdd } from 'react-icons/bi'
import TextField from 'components/TextField/TextField'
import Select from 'components/Select/Select'
import Checkbox from 'components/Checkbox/Checkbox'
import { PiPencil } from 'react-icons/pi'
import Textarea from 'components/Textarea/Textarea'
import productPlaceholderImage from './assets/thumbnail.png'
import { Controller, useForm } from 'react-hook-form'
import { useBrandsAsOptions } from 'features/brands/brandsApi'
import { useCategorysAsOptions } from 'features/category/categoryApi'
import { required } from 'helpers/formValidation'
import {
  PRODUCTS_BASE_URL,
  useCreateProduct,
  useProduct,
  useUpdateProduct
} from './productsApi'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { useGenerateSignedUrl, useUploadToS3 } from 'api/s3Bucket'
import { delay } from 'helpers/delay'

const CreateProduct = () => {
  const { productId } = useParams()
  const { options: brandOptions, isLoading: brandOptionsLoading } =
    useBrandsAsOptions()
  const { options: categoryOptions, isLoading: categoryOptionsLoading } =
    useCategorysAsOptions()
  const { mutate: createProductMutation } = useCreateProduct()
  const { mutate: updateProductMutation } = useUpdateProduct()
  const { mutate: generateSignedUrlMutation, mutateAsync: generateUrlAsync } =
    useGenerateSignedUrl()
  const { mutateAsync: uploadToS3Async } = useUploadToS3()
  const {
    data: product,
    isLoading: isLoadingProduct,
    isFetching
  } = useProduct(productId)

  const isUpdating = !!productId
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  const defaultValues: ProductFormData = {
    image: product?.image || '',
    name: product?.name || '',
    price: product?.price || '',
    discountPrice: product?.discountPrice || '',
    categoryId: product?.category?.id || '',
    brandId: product?.brand?.id || '',
    description: product?.description || '',
    stocks: product?.stocks || '',
    weight: product?.weight || '',
    length: product?.length || '',
    width: product?.width || '',
    height: product?.height || '',
    variants: product?.variants || {},
    userId: product?.userId || 'ed2a1fbe-c234-41fa-ba1e-3708c6ad34c7',
    startDate: product?.startDate || '10/10/2023',
    endDate: product?.endDate || '10/12/2023'
  }

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm<ProductFormData>({
    defaultValues,
    values: defaultValues,
    mode: 'all'
  })

  const onSubmit = handleSubmit(async (formData) => {
    if (isUpdating) {
      let finalImageToUpload = ''
      let finalPresignedUrl = ''

      if (file || product?.image) {
        if (file) {
          const res = await generateUrlAsync({
            service: 'Product',
            uploadType: 'Image',
            category: '5eae1d74-5275-11ee-a8cd-08920430c60a',
            imageName: file.name
          })
          const { awsUrl, presignedUrl } = res.data
          finalImageToUpload = awsUrl
          finalPresignedUrl = presignedUrl
        } else if (product) {
          finalImageToUpload = product?.image
        }

        updateProductMutation(
          { ...formData, image: finalImageToUpload, productId },
          {
            onSuccess: async (response) => {
              if (file) {
                await uploadToS3Async({ presignedUrl: finalPresignedUrl, file })
              }
              toast.success('Product created successfully')
              queryClient.invalidateQueries({
                queryKey: [PRODUCTS_BASE_URL]
              })
              navigate(`/products/${response.data.id}`)
            },
            onError(error: any) {
              toast.error(error.message)
            }
          }
        )
      }
    } else {
      if (file) {
        generateSignedUrlMutation(
          {
            service: 'Product',
            uploadType: 'Image',
            category: '5eae1d74-5275-11ee-a8cd-08920430c60a',
            imageName: file.name
          },
          {
            onSuccess(response) {
              const { awsUrl, presignedUrl } = response.data
              if (file) {
                createProductMutation(
                  { ...formData, image: awsUrl },
                  {
                    onSuccess: async (response) => {
                      await uploadToS3Async({ presignedUrl, file })
                      await delay(1000)
                      toast.success('Product created successfully')
                      queryClient.invalidateQueries({
                        queryKey: [PRODUCTS_BASE_URL]
                      })
                      navigate(`/products/${response.data.id}`)
                    },
                    onError(error: any) {
                      toast.error(error.message)
                    }
                  }
                )
              }
            },
            onError(error: any) {
              toast.error(error.message)
            }
          }
        )
      }
    }
  })

  useEffect(() => {
    if (brandOptions && brandOptions?.length > 0) {
      setValue('brandId', brandOptions[0].value)
    }
    if (categoryOptions && categoryOptions?.length > 0) {
      setValue('categoryId', categoryOptions[0].value)
    }
  }, [brandOptions, categoryOptions, setValue])

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/products"
          className="text-sm text-main-3 font-semibold flex items-center gap-x-2"
        >
          <TbArrowNarrowLeft className="text-main-3" />
          Back
        </Link>
        <span className="md:text-2xl text-lg font-bold">
          {isUpdating ? 'Update' : 'Add'} a Product
        </span>
        <Button
          className="bg-main-3 text-base font-semibold"
          label={`${isUpdating ? 'Update' : 'Save'} and publish`}
          onClick={onSubmit}
          disabled={!isValid || (!file && !product?.image)}
        />
      </div>
      <div className="border border-gray-100 bg-white rounded">
        <div className="md:flex block border-b-2 border-b-gray-50 pt-10 pb-5 px-8">
          <span className="w-1/5 text-base text-main-1 font-semibold block pb-4 md:pb-0">
            Media
          </span>
          <div className="md:w-4/5 w-full">
            <span className="block text-gray-800">Photos</span>
            <span className="block text-xs text-gray-600">
              JPEG, PNG or GIF only.{' '}
              <Button
                className="text-xs text-main-1"
                label="Image tips"
                appearance="basic"
              />
            </span>
            <div className="flex mt-2">
              <div className="mr-4">
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ) : (
                  product?.image && (
                    <img
                      src={product?.image}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )
                )}
              </div>
              <label
                htmlFor="dropzone-file"
                className="flex items-center justify-center border border-main-3 w-24 h-24 border-dashed rounded cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <BiImageAdd className="text-5xl text-main-3" />
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="md:flex block px-8 py-6 border-b-2 border-b-gray-50">
          <span className="w-1/5 text-base text-main-1 font-semibold block pb-4 md:pb-0">
            Details
          </span>
          <div className="md:w-4/5 w-full">
            <Controller
              name="name"
              rules={{
                required
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name"
                  hasErrors={!!errors?.name}
                  error={errors?.name?.message as string}
                  maxCharacters={30}
                  placeholder="Name"
                  {...field}
                />
              )}
            />

            <Controller
              name="price"
              rules={{
                required
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Price"
                  hasErrors={!!errors?.price}
                  error={errors?.price?.message as string}
                  placeholder="Price"
                  className="w-52 mb-4"
                  type="number"
                  {...field}
                />
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  options={categoryOptions || []}
                  label="Category"
                  disabled={categoryOptionsLoading}
                  {...field}
                />
              )}
            />
            <span className="block pt-4">
              <Controller
                name="brandId"
                control={control}
                render={({ field }) => (
                  <Select
                    options={brandOptions || []}
                    label="Brand"
                    disabled={brandOptionsLoading}
                    {...field}
                  />
                )}
              />
            </span>

            <Controller
              name="description"
              rules={{
                required
              }}
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Description"
                  rows={6}
                  className="mt-5 mb-4"
                  maxCharacters={100}
                  hasErrors={!!errors?.description}
                  error={errors?.description?.message as string}
                  placeholder="Description"
                  {...field}
                />
              )}
            />

            <div className="flex items-center gap-5">
              <Controller
                name="stocks"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Stocks"
                    hasErrors={!!errors?.stocks}
                    error={errors?.stocks?.message as string}
                    placeholder="No of stocks"
                    className="w-52"
                    type="number"
                    {...field}
                  />
                )}
              />
              <Checkbox
                className="text-main-3 translate-y-4"
                label="Always available"
                checked={false}
              />
            </div>

            <TextField
              label="Product Code"
              secondaryLabel="Optional. Change only if you have SKU for this item."
              className="mt-6"
            />
          </div>
        </div>
        <div className="md:flex block px-8 py-6 border-b-2 border-b-gray-50">
          <span className="w-1/5 text-base text-main-1 block pb-4 md:pb-0 font-semibold">
            Variants
          </span>
          <div className="md:w-4/5 w-full">
            <div className="border-b border-dashed pb-6">
              <Checkbox
                className="text-main-3"
                label="This product has multiple options (different sizes, colors, etc.)"
                checked={false}
              />
              <span className="flex justify-between pt-5">
                <span className="text-sm font-medium text-dark">Group</span>
                <Button appearance="basic" label="Edit" icon={PiPencil} />
              </span>
            </div>
            <div className="w-full">
              <span className="text-sm text-dark/80 block pt-4">Details</span>
              <div className="mb-2 w-full">
                <span className="flex gap-x-4">
                  <span className="w-24">&nbsp;</span>
                  <span className="w-2/5 text-xs font-semibold text-dark/80 block pl-3">
                    Price
                  </span>
                  <span className="w-1/5 text-xs font-semibold text-dark/80">
                    Qty
                  </span>
                  <span className="w-1/5 text-xs font-semibold text-dark/80">
                    Product Code
                  </span>
                </span>
                <span className="flex border border-gray-50 shadow-sm items-end gap-x-4 rounded p-3 mb-3 w-full">
                  <span className="w-24 block h-full">
                    <img
                      src={productPlaceholderImage}
                      className="w-full block"
                      alt="product"
                    />
                  </span>
                  <span className="w-2/5 block">
                    <span className="block text-dark text-sm py-2">White</span>
                    <TextField placeholder="Price" />
                  </span>
                  <span className="w-1/5 block">
                    <TextField type="number" placeholder="0" />
                  </span>
                  <span className="w-1/5 block">
                    <TextField type="number" placeholder="SKU" />
                  </span>
                </span>
                <span className="flex border border-gray-50 shadow-sm items-end gap-x-4 rounded p-3 mb-3 w-full">
                  <span className="w-24 block h-full">
                    <img
                      src={productPlaceholderImage}
                      className="w-full block"
                      alt="product"
                    />
                  </span>
                  <span className="w-2/5 block">
                    <span className="block text-dark text-sm py-2">White</span>
                    <TextField placeholder="price" />
                  </span>
                  <span className="w-1/5 block">
                    <TextField type="number" placeholder="0" />
                  </span>
                  <span className="w-1/5 block">
                    <TextField type="number" placeholder="SKU" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex block px-8 py-6 border-b-2 border-b-gray-50">
          <span className="w-1/5 text-base text-main-1 block pb-4 md:pb-0 font-semibold">
            Delivery
          </span>
          <div className="md:w-4/5 w-full">
            <Checkbox
              className="text-main-3"
              label="This is a physical product"
              checked={false}
            />
            <span className="block mt-4">
              <Controller
                name="weight"
                rules={{}}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="How heavy is the item?"
                    secondaryLabel="Note: Please use package weight, not product weight. Package weight is used to calculate shipping fee."
                    hasErrors={!!errors?.weight}
                    error={errors?.weight?.message as string}
                    placeholder="Weight"
                    className="w-60"
                    type="number"
                    {...field}
                  />
                )}
              />
            </span>
            <span className="block border-b pt-8 pb-12 border-dashed">
              <span className="text-dark/80 text-sm">Package Size</span>
              <span className="block text-xs pt-2 text-dark/80">
                These will be used to compute for the volumetric weight of your
                package during shipping fee calculation.
              </span>
              <span className="flex justify-between md:gap-x-1 gap-x-4 mt-5">
                <Controller
                  name="length"
                  rules={{}}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Length"
                      hasErrors={!!errors?.length}
                      error={errors?.length?.message as string}
                      placeholder="0"
                      className="w-60"
                      type="number"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="width"
                  rules={{}}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Width"
                      hasErrors={!!errors?.width}
                      error={errors?.width?.message as string}
                      placeholder="0"
                      className="w-60"
                      type="number"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="height"
                  rules={{}}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Height"
                      hasErrors={!!errors?.height}
                      error={errors?.height?.message as string}
                      placeholder="0"
                      className="w-60"
                      type="number"
                      {...field}
                    />
                  )}
                />
              </span>
            </span>
            <span className="block py-6">
              <Checkbox
                className="text-main-3"
                label="This product is made-to-order"
                checked
              />
              <TextField
                label="How much lead time to do you need for this product?"
                type="number"
                secondaryLabel="Indicate number of days"
                placeholder=""
                className="mt-6"
              />
            </span>
          </div>
        </div>
        <div className="py-6 px-8">
          <Button
            label="Publish and create another product"
            appearance="outline"
            className="block w-full"
            disabled
          />
          <Button
            label={`${isUpdating ? 'Update' : 'Save'} and publish`}
            className="block w-full mt-3"
            onClick={onSubmit}
            disabled={!isValid || (!file && !product?.image)}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
