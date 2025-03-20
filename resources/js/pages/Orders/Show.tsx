import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CheckCircle, ChevronLeft, ClipboardCopy, Package, Truck, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Import components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format_rupiah } from '@/lib/utils';

interface OrderItem {
    id: number;
    product_name: string;
    price: number;
    quantity: number;
    image: string | null;
}

interface TrackingUpdate {
    status: string;
    description: string;
    created_at: string;
}

interface Order {
    id: number;
    status: string;
    payment_status: string;
    payment_method: string;
    payment_proof?: string | null;
    shipping_address: string;
    shipping_cost: number;
    total_price: number;
    created_at: string;
    items: OrderItem[];
    tracking: TrackingUpdate[];
}

interface OrderShowProps {
    order: Order;
}

export default function OrderShow({ order }: OrderShowProps) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        payment_proof: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('payment_proof', e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.payment-proof', order.id), {
            onSuccess: () => {
                reset('payment_proof');
                toast.success('Payment proof uploaded successfully');
            },
            onError: () => {
                toast.error('Failed to upload payment proof');
            },
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'menunggu':
                return 'bg-amber-100 text-amber-800';
            case 'diproses':
                return 'bg-blue-100 text-blue-800';
            case 'driver_telah_ditugaskan':
                return 'bg-purple-100 text-purple-800';
            case 'terkirim':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'menunggu':
                return 'bg-amber-100 text-amber-800';
            case 'terbayar':
                return 'bg-green-100 text-green-800';
            case 'return':
                return 'bg-amber-100 text-amber-800';
            case 'diproses':
                return 'bg-blue-100 text-blue-800';
            case 'gagal':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case 'credit_card':
                return 'Credit Card';
            case 'bank_transfer':
                return 'Bank Transfer';
            case 'cash_on_delivery':
                return 'Cash on Delivery';
            default:
                return method;
        }
    };

    const subtotal = order.total_price - order.shipping_cost;

    // Check if payment proof can be uploaded (only for pending payment status)
    const canUploadPaymentProof = order.payment_status.toLowerCase() === 'menunggu';

    return (
        <>
            <Head title={`Order #${order.id}`} />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <Button variant="outline" asChild>
                            <Link href={route('orders.index')}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Kembali ke Pesanan
                            </Link>
                        </Button>
                    </div>

                    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
                            <p className="text-gray-500">Dibuat Pada {format(new Date(order.created_at), 'PPP')}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge className={getStatusColor(order.status)}>
                                Pesanan: {order.status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                            </Badge>
                            <Badge className={getPaymentStatusColor(order.payment_status)}>
                                Pembayaran: {order.payment_status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                            </Badge>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-12">
                        {/* Order Details */}
                        <div className="lg:col-span-8">
                            <Card className="mb-8">
                                <div className="border-b p-6">
                                    <h2 className="text-xl font-semibold">Rincian Pesanan</h2>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-6">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex border-b pb-6 last:border-0 last:pb-0">
                                                <div className="h-20 w-20 flex-shrink-0 rounded-md bg-gray-100">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.product_name}
                                                            className="h-full w-full rounded-md object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <span className="text-gray-400">No image</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col justify-between">
                                                    <div>
                                                        <h3 className="font-medium">{item.product_name}</h3>
                                                        <p className="text-sm text-gray-500">Price: {format_rupiah(item.price)}</p>
                                                    </div>

                                                    <>
                                                        <p className="text-sm text-gray-500">Jumlah : {item.quantity}</p>

                                                        <p className="font-medium">{format_rupiah(item.price * item.quantity)}</p>
                                                    </>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="border-b p-6">
                                    <h2 className="text-xl font-semibold">Pelacakan Pesanan</h2>
                                </div>

                                <div className="p-6">
                                    <div className="relative">
                                        <div className="absolute top-0 left-4 h-full w-px bg-gray-200"></div>

                                        <div className="space-y-8">
                                            {order.tracking.map((track, index) => (
                                                <div key={index} className="relative pl-10">
                                                    <div className="bg-primary absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full text-white">
                                                        {index === 0 ? (
                                                            <CheckCircle className="h-5 w-5" />
                                                        ) : index === 1 ? (
                                                            <Package className="h-5 w-5" />
                                                        ) : index === 2 ? (
                                                            <ClipboardCopy className="h-5 w-5" />
                                                        ) : (
                                                            <Truck className="h-5 w-5" />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h3 className="font-medium">
                                                            {track.status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                                                        </h3>
                                                        <p className="text-gray-500">{track.description}</p>
                                                        <p className="mt-1 text-xs text-gray-400">{format(new Date(track.created_at), 'PPP p')}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Summary and Details */}
                        <div className="lg:col-span-4">
                            <Card className="mb-6">
                                <div className="border-b p-6">
                                    <h2 className="text-xl font-semibold">Ringkasan Pesanan</h2>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>{format_rupiah(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Ongkir</span>
                                            <span>{format_rupiah(order.shipping_cost)}</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2 font-medium">
                                            <span>Total</span>
                                            <span>{format_rupiah(order.total_price)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="mb-6">
                                <div className="border-b p-6">
                                    <h2 className="text-xl font-semibold">Informasi Pesanan</h2>
                                </div>

                                <div className="p-6">
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm text-gray-500">Payment Method</dt>
                                            <dd>{getPaymentMethodLabel(order.payment_method)}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm text-gray-500">Transfer</dt>
                                            <dd>BCA : 154545651564</dd>
                                            <dt className="text-sm text-gray-500">Silahkan lakukan pembayaran ke nomor rekening di atas</dt>
                                        </div>

                                        <div>
                                            <dt className="text-sm text-gray-500">Shipping Address</dt>
                                            <dd className="whitespace-pre-wrap">{order.shipping_address}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </Card>

                            {/* Payment Proof Section */}
                            <Card>
                                <div className="border-b p-6">
                                    <h2 className="text-xl font-semibold">Bukti Pembayaran</h2>
                                </div>

                                <div className="p-6">
                                    {order.payment_proof ? (
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-500">Bukti Pembayaran Berhasi Diupload.</p>
                                            <div className="overflow-hidden rounded-md border">
                                                <img src={`/storage/${order.payment_proof}`} alt="Payment proof" className="h-auto w-full" />
                                            </div>

                                            <Badge className={getPaymentStatusColor(order.payment_status)}>
                                                Status: {order.payment_status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                                            </Badge>
                                        </div>
                                    ) : canUploadPaymentProof ? (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="payment_proof">Upload Bukti Pembayaran</Label>
                                                <Input
                                                    id="payment_proof"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className={errors.payment_proof ? 'border-red-500' : ''}
                                                />
                                                {errors.payment_proof && <p className="text-sm text-red-500">{errors.payment_proof}</p>}
                                            </div>

                                            {progress && (
                                                <div className="h-2.5 w-full rounded-full bg-gray-200">
                                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                                                </div>
                                            )}

                                            <Button type="submit" className="w-full" disabled={processing || !data.payment_proof}>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Konfirmasi
                                            </Button>

                                            <p className="text-xs text-gray-500">
                                                Silakan unggah bukti pembayaran (struk atau konfirmasi transfer). Format yang diterima: JPG, PNG (maks
                                                2MB).
                                            </p>
                                        </form>
                                    ) : (
                                        <div className="py-4 text-center">
                                            <p className="text-gray-500">Anda sepertinya telah mengirim bukti pembayaran.</p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
